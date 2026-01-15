// const dbc = require('../db/dbc')
// const axios = require('axios')
const jwtMiddleware = require('../middlewares/jwt')
require('dotenv').config({ path:'../.env'});

const session = require('express-session')
const mysqlstore = require('express-mysql-session')(session)
const option = require('../db/dboption') 
 const mysqlsessionstore = new mysqlstore(option.sessionconfig)



const getuserlist = async (request, response, next) => {
    console.log('c_getuserlist')

    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/if/userlist'),
        //     headers: { Authorization: `Bearer ${request.session.user.name}` },
        //     params:{s_order:request.params.s_order,e_order:request.params.e_order},
        // })

        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/if/userlist',null,{s_order:request.params.s_order,e_order:request.params.e_order})                        
        response.send(result);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send([]);
        }
    }



}


const getuserlist_search = async (request, response, next) => {
    console.log('c_getuserlist_search')

    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/if/userlist/search'),
        //     headers: { Authorization: `Bearer ${request.session.user.name}` },
        //     params:{column:request.params.column,data:request.params.data},
        // })

        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/if/userlist/search',null,{column:request.params.column,data:request.params.data})                        
        response.send(result);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send([]);
        }
    }



}

const insertuser = async (request, response, next) =>{
    console.log('c_insert')

    const email = request.body.email
    const name = request.body.name
    const password = request.body.password

    const sendInsertResultData = {
        isInserted:false,
        errorMessage :""
    };

    if(email && name && password){

        try{
            // const comfirm = await axios({
            //     method:'POST',
            //     url:process.env.OCPPURL.concat('/if/user/register'),
            //     headers: { Authorization: `Bearer ${request.session.user.name}` },
            //     data: {
            //         email: email,
            //         name: name,
            //         password:password
            //     } 
            // })


            // const result = comfirm.data.item;

            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/register',{email: email,name: name, password:password},null)                        


            // console.log(result)
            if(result.item){

                sendInsertResultData.isInserted = true
                response.send(sendInsertResultData)
            }else{
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendInsertResultData.isInserted = false
        sendInsertResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendInsertResultData)
        // response.redirect(response.locals.base)
    }
}

const removeuser = async (request, response, next) =>{
    console.log('c_removeuser')

    const email = request.body.email
    const name = request.body.name

    const sendRemoveResultData = {
        isRemoved:false,
        errorMessage :""
    };

    if(email && name){

        try{
            // const comfirm = await axios({
            //     method:'POST',
            //     url:process.env.OCPPURL.concat('/if/user/deleter'),
            //     headers: { Authorization: `Bearer ${request.session.user.name}` },
            //     data: {
            //         email: email,
            //         name: name,
            //     } 
            // })


            // const result = comfirm.data.item;
            // console.log(result)

            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/deleter',{email: email,name: name},null)
            
            if(result.item){

                sendRemoveResultData.isRemoved = true
                response.send(sendRemoveResultData)
            }else{
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
                // response.redirect(response.locals.base)
            }

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
            }

        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendRemoveResultData.isRemoved = false
        sendRemoveResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendRemoveResultData)
        // response.redirect(response.locals.base)
    }
}

const updateuser = async (request, response, next) =>{
    console.log('c_update')

    const email = request.body.email
    const name = request.body.name
    const password = request.body.password

    const sendUpdateResultData = {
        isUpdated:false,
        errorMessage :""
    };

    if(email && name && password){

        try{
            // const comfirm = await axios({
            //     method:'POST',
            //     url:process.env.OCPPURL.concat('/if/user/updater'),
            //     headers: { Authorization: `Bearer ${request.session.user.name}` },
            //     data: {
            //         email: email,
            //         name: name,
            //         password:password
            //     } 
            // })


            // const result = comfirm.data.item;

            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/updater',{email: email,name: name,password:password},null)

            // console.log(result)
            if(result.item){

                sendUpdateResultData.isUpdated = true
                response.send(sendUpdateResultData)
            }else{
                sendUpdateResultData.isUpdated = false
                sendUpdateResultData.errorMessage = "수정에 실패했습니다"
                response.send(sendUpdateResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendUpdateResultData.isUpdated = false
                sendUpdateResultData.errorMessage = "수정에 실패했습니다"
                response.send(sendUpdateResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendUpdateResultData.isUpdated = false
        sendUpdateResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendUpdateResultData)
        // response.redirect(response.locals.base)
    }
}

const logoutuser = async (request, response, next) =>{
    console.log('c_logout')

    const email = request.body.email
    const type = request.body.type

    const sendLogoutResultData = {
        isLogouted:false,
        errorMessage :""
    };

    if(email && type){
        try{

            if( type == "web" || type == "all"){
                //웹 세션 지우기
                const sessions = await new Promise((resolve, reject) => {
                    mysqlsessionstore.all((err, sessions) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(sessions);
                        }
                    });
                });

                const sessionIds = Object.keys(sessions).filter(sessionId => {
                    const session = sessions[sessionId];
                    return session.user.email === email;
                });

                await Promise.all(sessionIds.map(sessionId => {
                    return new Promise((resolve, reject) => {
                        mysqlsessionstore.destroy(sessionId, (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                }));  
            }




            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/logouter',{email: email,type: type},null)

            // console.log(result)
            if(result.item){
                sendLogoutResultData.isLogouted = true
                response.send(sendLogoutResultData)
            }else{
                sendLogoutResultData.isLogouted = false
                sendLogoutResultData.errorMessage = "로그아웃에 실패했습니다"
                response.send(sendLogoutResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendLogoutResultData.isLogouted = false
                sendLogoutResultData.errorMessage = "로그아웃에 실패했습니다"
                response.send(sendLogoutResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendLogoutResultData.isLogouted = false
        sendLogoutResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendLogoutResultData)
        // response.redirect(response.locals.base)
    }
}

const alarmuser = async (request, response, next) =>{
    console.log('c_update')

    const user = request.body.user
    const title = request.body.title
    const content = request.body.content

    const sendAlertResultData = {
        isResulted:false,
        errorMessage :""
    };

    if(user && title && content){

        try{
            // const comfirm = await axios({
            //     method:'POST',
            //     url:process.env.OCPPURL.concat('/if/user/alert'),
            //     headers: { Authorization: `Bearer ${request.session.user.name}` },
            //     data: {
            //         user: user,
            //         title: title,
            //         content:content
            //     } 
            // })


            // const result = comfirm.data.item;
            // console.log(result)

            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/alert',{user: user, title: title,content:content},null)

            if(result.item){

                sendAlertResultData.isResulted = true
                response.send(sendAlertResultData)
            }else{
                sendAlertResultData.isResulted = false
                sendAlertResultData.errorMessage = "전송에 실패했습니다"
                response.send(sendAlertResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendAlertResultData.isResulted = false
                sendAlertResultData.errorMessage = "전송에 실패했습니다"
                response.send(sendAlertResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendAlertResultData.isResulted = false
        sendAlertResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendAlertResultData)
        // response.redirect(response.locals.base)
    }
}

const alarmwhole= async (request, response, next) =>{
    console.log('c_update')

    const title = request.body.title
    const content = request.body.content

    const sendAlertResultData = {
        isResulted:false,
        errorMessage :""
    };

    if(title && content){

        try{
            // const comfirm = await axios({
            //     method:'POST',
            //     url:process.env.OCPPURL.concat('/if/user/alert/whole'),
            //     headers: { Authorization: `Bearer ${request.session.user.name}` },
            //     data: {
            //         title: title,
            //         content:content
            //     } 
            // })


            // const result = comfirm.data.item;
            // console.log(result)

            const result = await jwtMiddleware.callGoAPI(request,'POST','/if/user/alert/whole',{title: title,content:content},null)

            if(result.item){

                sendAlertResultData.isResulted = true
                response.send(sendAlertResultData)
            }else{
                sendAlertResultData.isResulted = false
                sendAlertResultData.errorMessage = "전송에 실패했습니다"
                response.send(sendAlertResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendAlertResultData.isResulted = false
                sendAlertResultData.errorMessage = "전송에 실패했습니다"
                response.send(sendAlertResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendAlertResultData.isResulted = false
        sendAlertResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendAlertResultData)
        // response.redirect(response.locals.base)
    }
}

module.exports = {
    getuserlist,
    getuserlist_search,
    insertuser,
    removeuser,
    updateuser,
    logoutuser,
    alarmuser,
    alarmwhole,
}