// const dbc = require('../db/dbc')
const axios = require('axios')
require('dotenv').config({ path:'../.env'});



const getuserlist = async (request, response, next) => {
    console.log('c_getuserlist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/userlist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{s_order:request.params.s_order,e_order:request.params.e_order},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }



}


const getuserlist_search = async (request, response, next) => {
    console.log('c_getuserlist_search')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/userlist/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{column:request.params.column,data:request.params.data},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
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
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/user/register'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    email: email,
                    name: name,
                    password:password
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

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
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/user/deleter'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    email: email,
                    name: name,
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            
            if(result){

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
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/user/updater'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    email: email,
                    name: name,
                    password:password
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

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
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/user/alert'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    user: user,
                    title: title,
                    content:content
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

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
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/user/alert/whole'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    title: title,
                    content:content
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

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
    alarmuser,
    alarmwhole,
}