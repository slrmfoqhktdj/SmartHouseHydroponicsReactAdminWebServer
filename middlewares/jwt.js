const axios = require('axios');
require('dotenv').config({ path:'../.env'});


// Node.js - 토큰 갱신 미들웨어
async function ensureValidAccessToken(request, res, next) {
  if (!request.session.tokens) {
    return res.status(401).json({message:"인증이 만료되었거나 증명되지 않았습니다. 다시 로그인해주세요."});
  }

  const { access_token, refresh_token, expires_in } = request.session.tokens;
  const now = Date.now();

  // Access Token이 만료되었거나 5분 이내 만료 예정
  if (now >= expires_in - ( 5 * 60 * 1000)) {

    // console.error('Token refresh !!!'+ request.session.user.email + ' : ' +request.session.tokens.refresh_token + ' expires_in : '+ request.session.tokens.expires_in + ' now : ' + now);

    try {
      // Go 서버에 토큰 갱신 요청
      const comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/if/jwt/refresh'),
            data: {
                refresh_token: refresh_token,
            },
        })

        const data = comfirm.data

        if(data.success){

            request.session.tokens = {
                access_token:data.token_pair.access_token,
                refresh_token:data.token_pair.refresh_token,
                expires_in:Date.now() + (data.token_pair.expires_in * 1000)
            }
            // console.error('Token refreshed !!!'+ request.session.user.email + ' : ' +data.token_pair.refresh_token + ' expires_in : '+ request.session.tokens.expires_in + ' now : ' + now);
    
            await new Promise((resolve, reject) => {
                request.session.save((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            // console.log('Access token refreshed for user:', request.session.user.email);
        }else{
            console.error('Token refresh failed:', error);
      
            // Refresh Token도 만료된 경우 세션 파괴
            return request.session.destroy((err) => {
                res.status(401).json({message:'세션이 만료되었습니다. 다시 로그인해주세요.' });
            });
        }

    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Refresh Token도 만료된 경우 세션 파괴
      return request.session.destroy((err) => {
        res.status(401).json({message:'세션이 만료되었습니다. 다시 로그인해주세요.' });
      });
    }
  }

  next();
}

// Node.js - Go API 호출 헬퍼 함수
async function callGoAPI(req, method, path, data = null, params = null) {
  // Access Token 유효성 확인 및 갱신
  await ensureValidAccessToken(req, null, () => {});

  const config = {
    method: method,
    url: process.env.OCPPURL.concat(path),
    headers: {
      'Authorization': `Bearer ${req.session.tokens.access_token}`,
    //   'Content-Type': 'application/json'
    },
  };

  if (data) {
    // data에 refresh_token이 존재할경우 갱신된 refresh_token 로 교체
    if(data.refresh_token){
      console.log('callGoAPI logout set data')
      data.refresh_token = req.session.tokens.refresh_token;
    }
    
    config.data = data;
  }

  if (params) {
    config.params = params;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // 토큰 만료로 인한 401 에러 - 재시도
      await ensureValidAccessToken(req, null, () => {});
      config.headers['Authorization'] = `Bearer ${req.session.tokens.access_token}`;
      const retryResponse = await axios(config);
      return retryResponse.data;
    }
    throw error;
  }
}


module.exports = {
    callGoAPI,
}