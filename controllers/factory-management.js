// const dbc = require('../db/dbc')
const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getdevicelist = async (request, response, next) => {  
    console.log('c_getdevicelist')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/devicelist'),
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

const getdevicelist_search = async (request, response, next) => {  
    console.log('c_getdevicelist_search')

    let result = []

    let d

    switch (request.params.data) {
        case "true":
            d = "1"
            break;
        case "false":
            d = "0"
            break;
        case "수동":
            d = "0"
            break;
        case "자동":
            d = "1"
            break;
        case "연결끊김":
            d = "2"
            break;
        default:
            d = request.params.data
            break;
    }

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/devicelist/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{column:request.params.column,data:d},
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

const getdeviceappointlist = async (request, response, next) => {
    console.log('c_getdeviceappointlist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceappointlist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
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


    


    // console.log(result)

}

const getdeviceappointlist_search = async (request, response, next) => {
    console.log('c_getdeviceappointlist_search')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceappointlist/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{id:request.params.device},
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



const getdeviceuserlist = async (request, response, next) => {
    console.log('c_getdeviceuserlist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceuserlist'),
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


const getdeviceuserlist_search = async (request, response, next) => {
    console.log('c_getdeviceuserlist_search')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceuserlist/search'),
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

const insertdeviceuser = async (request, response, next) =>{
    console.log('c_insertdevice')

    const user = request.body.user
    const id = request.body.id


    const sendInsertResultData = {
        isInserted:false,
        errorMessage :""
    };

    if(user && id){
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/deviceuser/register'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    user: user,
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

const removedeviceuser = async (request, response, next) =>{
    console.log('c_removedeviceuser')

    const user = request.body.user
    const id = request.body.id

    const sendRemoveResultData = {
        isRemoved:false,
        errorMessage :""
    };

    if(user && id){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/if/deviceuser/deleter'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    user: user,
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

const rebootsoftware = async (request, response, next) =>{
    console.log('c_rebootsoftware')

    const id = request.body.id

    const sendRebootResultData = {
        isRebooted:false,
        errorMessage :"",
    };

    if(id){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/rbsw',
                headers:{
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   id:id,
                }
            })
            
            const getData = comfirm.data

            if(getData.id == id){
                if(getData.result == true){
                    sendRebootResultData.isRebooted = true
                }else {
                    sendRebootResultData.isRebooted = false
                    sendRebootResultData.errorMessage = "기기에서 재부팅에 실패했습니다."
                }
            }else{
                sendRebootResultData.isRebooted = false
                sendRebootResultData.errorMessage = "기기와의 연결이 끊겼습니다."
            }

            response.send(sendRebootResultData)

        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendRebootResultData.isRebooted = false
                sendRebootResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendRebootResultData)
            }
        }
        
    }else{
        sendRebootResultData.isOnoffed = false
        sendRebootResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendRebootResultData)
    }
}

const reboothardware = async (request, response, next) =>{
    console.log('c_reboothardware')

    const id = request.body.id

    const sendRebootResultData = {
        isRebooted:false,
        errorMessage :"",
    };

    if(id){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/rbhw',
                headers:{
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   id:id,
                }
            })
            
            const getData = comfirm.data

            if(getData.id == id){
                if(getData.result == true){
                    sendRebootResultData.isRebooted = true
                }else {
                    sendRebootResultData.isRebooted = false
                    sendRebootResultData.errorMessage = "기기에서 재부팅에 실패했습니다."
                }
            }else{
                sendRebootResultData.isRebooted = false
                sendRebootResultData.errorMessage = "기기와의 연결이 끊겼습니다."
            }

            response.send(sendRebootResultData)

        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendRebootResultData.isRebooted = false
                sendRebootResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendRebootResultData)
            }
        }
        
    }else{
        sendRebootResultData.isOnoffed = false
        sendRebootResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendRebootResultData)
    }
}

const onoffsettings = async (request, response, next) =>{
    console.log('c_onoffsettings')

    const id = request.body.id
    const key =  request.body.key
    const value =  request.body.value

    const sendupdatesettingsResultData = {
        isOnoffed:false,
        errorMessage :"",
    };

    if(id&&key){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/nf',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   id:id,
                   key:key,
                   value:value
                }
            })


            
            const getData = comfirm.data

            if(getData.id == id){
                if(getData.result == true){
                    sendupdatesettingsResultData.isOnoffed = true
                }else {
                    sendupdatesettingsResultData.isOnoffed = false
                    sendupdatesettingsResultData.errorMessage = "기기에서 onoff에 실패했습니다."
                }
            }else{
                sendupdatesettingsResultData.isOnoffed = false
                sendupdatesettingsResultData.errorMessage = "기기와의 연결이 끊겼습니다."
            }
            

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendupdatesettingsResultData.isOnoffed = false
                sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendupdatesettingsResultData)
            }
        }


        
        
    }else{
        sendupdatesettingsResultData.isOnoffed = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}


const appointupdate = async (request, response, next) =>{
    console.log('c_appointupdate')

    const id = request.body.id
    const name =  request.body.name
    const startt =  request.body.startt
    const stopt =  request.body.stopt
    const onoff =  request.body.onoff

    const sendupdatesettingsResultData = {
        isUpdated:false,
        errorMessage :"",
    };

    console.log("id : "+id+",name : "+name+",startt : "+startt+",stopt : "+stopt+", onoff : "+onoff)

    if(id&&name&&startt&&stopt&&onoff){

        try{

            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/app/cmd/appoint/',name),
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   id:id,
                   startt:startt,
                   stopt:stopt,
                   onoff:('true'==onoff)
                }
            })


            
            const getData = comfirm.data

            if(getData.id == id){
                if(getData.result == true){
                    sendupdatesettingsResultData.isUpdated = true
                }else {
                    sendupdatesettingsResultData.isUpdated = false
                    sendupdatesettingsResultData.errorMessage = "예약 수정에 실패했습니다."
                }
            }else{
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "기기와의 연결이 끊겼습니다."
            }
            

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendupdatesettingsResultData)
            }
        }


        
        
    }else{
        sendupdatesettingsResultData.isUpdated = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}






module.exports = {
    getdevicelist,
    getdevicelist_search,
    getdeviceappointlist,
    getdeviceappointlist_search,
    getdeviceuserlist,
    getdeviceuserlist_search,
    insertdeviceuser,
    removedeviceuser,
    rebootsoftware,
    reboothardware,
    onoffsettings,
    appointupdate,
}