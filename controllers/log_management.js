const fs = require('fs');
// const axios = require('axios')
const jwtMiddleware = require('../middlewares/jwt')
require('dotenv').config({ path:'../.env'});

// 날짜 뺴기 함수
function subtractDays(date, days) {
    date.setDate(date.getDate() - days);
  
    return date;
}

const getDevicelogcmdpage = async (request, response, next) => {  
    console.log('c_getDevicelogcmdpage')

    // let result = []

    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/if/devicelogcmdpage'),
        //     headers: { Authorization: `Bearer ${request.session.user.name}` },
        //     params:{s_order:request.params.s_order,e_order:request.params.e_order},
        // })

        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/if/devicelogcmdpage',null,{s_order:request.params.s_order,e_order:request.params.e_order})
                        
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

const getDevicelogcmdpage_search = async (request, response, next) => {  
    console.log('c_getDevicelogcmdpage_search')

    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/if/devicelogcmdpage/search'),
        //     headers: { Authorization: `Bearer ${request.session.user.name}` },
        //     params:{column:request.params.column,data:request.params.data},
        // })

        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/if/devicelogcmdpage/search',null,{column:request.params.column,data:request.params.data})
                        
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

const getDeviceloglistpage = async (request, response, next) => {  
    console.log('c_getDeviceloglistpage')

    let result = []

    try{
        const logpath = __dirname+"/../logs";
        const rows = fs.readdirSync(logpath);

        if(rows != null && rows.length>0){  // 응답이 없을경우
            for(i = rows.length-1 ; i >= 0; i --){

                const rowspits = rows[i].split("&&")
            

                const sendDeviceLogListData ={ 
                    id: rows[i],
                    s_time:rowspits[1],
                    e_time:rowspits[2].split('.')[0],
                    c_time:new Date(fs.statSync(logpath+"/"+rows[i]).birthtime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul'})
                }
        
                result.push(sendDeviceLogListData)
            }
        }
        
        response.send(result);

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

const commandUploadLog = async (request, response, next) => {  
    console.log('c_commandUploadLog')



    const msg = request.body
    // msg.~~
    const device_id = msg.id
    
    let startdatetime = msg.startdatetime
    let stopdatetime = msg.stopdatetime


    // const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezoneDate = new Date(Date.now() - timezoneOffset);

    if(stopdatetime != ""){
        stopdatetime = new Date(stopdatetime).toISOString()
    }else{
        stopdatetime = timezoneDate.toISOString()
    }

    if(startdatetime != ""){
        startdatetime = new Date(startdatetime).toISOString()
    }else{
        startdatetime = subtractDays(timezoneDate,3)
    }

    console.log(startdatetime)
    console.log(stopdatetime)

    let result = {
        isUploaded:true,
        errorMessage:""
    }


    try{

        // const comfirm = await axios({
        //     method:'POST',
        //     url:process.env.OCPPURL+'/command/lgup',
        //     headers:{
        //         Authorization: `Bearer ${request.session.user.name}`,
        //     },
        //     data:{
        //         // Location:fullUrl,
        //         id:device_id,
        //         location:"uploadlog",
        //         startTime: startdatetime,
        //         stopTime: stopdatetime
        //     }
        // })


        const data = await jwtMiddleware.callGoAPI(request,'POST','/command/lgup',{id:device_id,location:"uploadlog",startTime: startdatetime,stopTime: stopdatetime},null)                
    

        if(data.fileName == "" || data.fileName == null){
            console.log("not found log")
    
            result.isUploaded = false
            result.errorMessage = "기기가 서버와의 연결이 되질 않았거나 해당 로그를 찾을 수 없습니다."
        }
        // else{
        //     console.log(comfirm.data.fileName);
            
        // }

        response.send(result);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            result.isUploaded = false
            result.errorMessage = "서버와의 통신 문제로 명령을 보내지 못했거나 기기에서의 응답이 없습니다."
            response.send(result);
        }
    }    
    

}


const commandRemoveAllLog = async (request, response, next) => {  
    console.log('c_commandRemoveAllLog')

    const msg = request.body
    const device_id = msg.id


    let result = {
        isRemove:true,
        errorMessage:""
    }

    const logpath = __dirname+"/../logs";
    const logrows = fs.readdirSync(logpath);

    for(i = 0; i < logrows.length; i ++){

        try{
            if(logrows[i].split("&&")[0]===device_id){
                fs.unlinkSync(logpath+"/"+logrows[i])
            }
            
        } catch(err){
            console.log(err)
            
            result.isRemove= false
            result.errorMessage = "몇몇 파일을 삭제하는데 문제가 발생했습니다."
            
        }
        
       
        
    }



    response.send(result);
}


const commandRemoveLog = async (request, response, next) => {  
    console.log('c_commandRemoveLog')

    const msg = request.body
    const filename = msg.filename


    let result = {
        isRemove:true,
        errorMessage:""
    }

    const logpath = __dirname+"/../logs/"+filename;
    try{
        fs.unlinkSync(logpath);
    }catch(e){
        console.log(err)
            
        result.isRemove= false
        result.errorMessage = "파일을 삭제하는데 문제가 발생했습니다."
    }


    response.send(result);
}


const uploadLog = async (request, response, next) => {
    console.log('uploadLog')

    // // const file = request.file;
    // console.log(request.file)

    let result = {
        isUploaded:true,
        errorMessage:""
    }

    if(response.error){
        result.isUploaded = false
        result.errorMessage = response.error
    }

    response.send(result);
}

const downloadLog = async (request, response, next) => {
    console.log('downloadLog')

    const filename = request.params.fileName;


    const logpath = __dirname+"/../logs/"+filename;

    console.log(filename)

    if(!fs.existsSync(logpath)){
        const error = new HttpError("찾으시는 파일이 없습니다.", 500);

        next(error);
    }else{

        response.setHeader("Content-type","text/plain")

        fs.createReadStream(logpath).on("error",(err)=>{
            console.error("서버에서 파일 읽는 중 오류 발생:", err);
            response.status(500).send("Server Error");
        }).pipe(response);


    }




}

module.exports = {
    getDevicelogcmdpage,
    getDevicelogcmdpage_search,
    getDeviceloglistpage,
    commandUploadLog,
    commandRemoveAllLog,
    commandRemoveLog,
    uploadLog,
    downloadLog,
}