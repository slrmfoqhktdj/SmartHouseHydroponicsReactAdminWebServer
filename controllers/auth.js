const bcrypt = require('bcrypt')
const axios = require('axios')
const jwtMiddleware = require('../middlewares/jwt')
require('dotenv').config({ path:'../.env'});



// sign up user
// const signup = async (request, response, next) =>{
//     console.log('c_auth signup')
//     let userInfo = {
//         name : request.body.name,
//         email: request.body.email
//     }
//     let hashedPassword = ''
//     if(request.body.password !== ''){
//          hashedPassword = await bcrypt.hash(request.body.password,12)
//     }
//     let user = new User({...userInfo, password:hashedPassword})
//     await user.save().then(()=>{
//         request.session.user = userInfo
//         request.session.save()
//         response.redirect(response.locals.base + 'dashboard/demo-one/' + response.getLocale())
//     }).catch(error=>{
//         response.render('../views/auth/register',{
//             title:'Register',
//             name:'register',
//             layout:'../views/auth/auth_layout.ejs',
//             errors:error.errors,
//             input:{
//                 name:request.body.name,
//                 email:request.body.email,
//                 password:request.body.password
//             }
//         })
//     })    
// }



// check if the user is guest
// const isGuest = (request, response) => {
//     const sendGuestData = {isGuest:false};

//     console.log('Check Login')
//     if(request.session.user){
        
//         sendGuestData.isGuest = true
//     }else{
//         sendGuestData.isGuest = false
//     }
//     return response.send(sendGuestData)
// }

// authenticate user
const authenticate = async (request, response, next) => {
    console.log('c_auth authenticate')

    const email = request.body.email
    const password = request.body.password

    const sendAuthenticateData = {
        isLogin:false,
        errorMessage :""
    };

    if(email && password){
        // const rows = await dbc.getLogin(email,password);
        
        
        try{
            const comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/login'),
                data: {
                    email: email,
                    pwd: password
                }   
            })


            const data = comfirm.data.item

    
            if(data.name != ''&& data.email != ''){
                const userInfo = {
                    email:data.email,
                }

                const tokenInfo = {
                    access_token:data.token_pair.access_token,
                    refresh_token:data.token_pair.refresh_token,
                    expires_in:Date.now() + (data.token_pair.expires_in * 1000) // milliseconds화 하여 만료시간 계산 후 저장 
                }

            
                request.session.user = userInfo
                request.session.tokens = tokenInfo
                await request.session.save()

                console.log("User logged in:", request.session.user.email);

                sendAuthenticateData.isLogin = true
                response.send(sendAuthenticateData)
            }else{
                sendAuthenticateData.isLogin = false
                sendAuthenticateData.errorMessage = "일치하는 정보가 없습니다"
                response.send(sendAuthenticateData)
            }
        }catch(e){
            console.log("err : "+e);
            sendAuthenticateData.isLogin = false
            sendAuthenticateData.errorMessage = "서버와의 연결이 불안정합니다. 잠시후 다시 시도해주세요."
            response.send(sendAuthenticateData)
            return
        }

       

        
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendAuthenticateData.isLogin = false
        sendAuthenticateData.errorMessage = "정보를 입력해주세요"
        response.send(sendAuthenticateData)
        // response.redirect(response.locals.base)
    }


       
}

// sign out user
const signOut =  async (request, response, next) => {
    console.log('c_auth signout')

    const sendAuthenticateData = {
        isLogout:false,
        errorMessage :""
    };

    try{
        const data = await jwtMiddleware.callGoAPI(request,'POST','/if/logout',{ email: request.session.user.email,refresh_token: request.session.tokens.refresh_token},null)

        sendAuthenticateData.isLogout = data.success

        request.session.destroy()

        if(data.success){
            response.send(sendAuthenticateData)
        }else{
            sendAuthenticateData.errorMessage = "서버와의 연결이 불안정합니다."
            response.send(sendAuthenticateData)
        }
    }catch(e){
        sendAuthenticateData.isLogout = false
        sendAuthenticateData.errorMessage = "서버와의 연결이 불안정합니다."
        response.send(sendAuthenticateData)
    }
}



module.exports = {
    // isGuest,
    // signup,
    authenticate,
    signOut
}