<<<<<<< HEAD
const fs = require('fs');
const axios = require('axios')
require('dotenv').config({ path:'../.env'});
const updatefile_path = "update_zip"


const getZipfilelist = async (request, response, next) => {
    console.log('c_getZipfilelist')


    const path = __dirname.concat("/../",updatefile_path);

    let result = {data:[]}


    const rowPathItem = fs.readdirSync(path);

    for(j = 0; j < rowPathItem.length; j++){

        const getT = fs.statSync(path.concat('/',rowPathItem[j])).mtime        // node js 는 시스템 로컬 타임과 관계없이 UTC로 반환함
        const CreateDay = new Date(getT).toLocaleString()       // 한국 시간 변환

        const sendFileListData ={
            id: rowPathItem[j],
            u_time: CreateDay,
        }

        result.data.push(sendFileListData)

    }



    response.send(result);
}

const getDeviceswlist = async (request, response, next) => {  
    console.log('c_getDeviceswlist')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceupdatelist'),
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

const getDeviceswlist_search = async (request, response, next) => {  
    console.log('c_getDeviceswlist_search')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceupdatelist/search'),
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

const uploadZip = async (request, response, next) => {
    console.log('c_UploadZip')

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


const deleteZip = async (request, response, next) => {
    console.log('c_deleteZip')

    const msg = request.body
    const modelitem = msg.modelitem


    let result = {
        isDeleted:true,
        errorMessage:""
    }

    if(modelitem){
        try{
            fs.unlinkSync(__dirname.concat("/../",updatefile_path,"/",modelitem))
        }catch(err){
            result.isDeleted = false
            result.errorMessage = "모델삭제에 실패했습니다."
            console.log(err)
        }
    
        if(response.error){
            result.isDeleted = false
            result.errorMessage = response.error
        }

    }else{
        result.isDeleted = false
        result.errorMessage = "모델삭제에 실패했습니다."
    }


    response.send(result);
}

const commandUpdateFirmWare = async (request, response, next) => {  
    console.log('c_commandUpdateFirmWare')

    const msg = request.body
    const device_id = msg.id
    const modelfile = msg.modelfile


    // console.log(msg)
    // console.log(request.headers.host)

    let result = {
        isUpdated:true,
        errorMessage:""
    }


    // console.log(request.protocol+"//"+request.headers.host+"/"+model+"/app-debug.apk")

    const path = modelfile


    if(!fs.existsSync(__dirname.concat("/../",updatefile_path,"/",modelfile))){
        result.isUpdated = false
        result.errorMessage = "업데이트할 zip가 존재하지 않습니다."
        response.send(result);
        return
    }

    

    try{

        comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/command/udfw'),
            headers:{
                Authorization: `Bearer ${request.session.user.name}`,
            },
            data:{
                Id:device_id,
                Location:path,
            }
        })

        console.log(comfirm.data)

        response.send(result);

    }catch(e){

        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            result.isUpdated = false
            result.errorMessage = e
            response.send(result);
        }
    }

   
        
    

}

// const downloadApk = async (request, response, next) => {
//     console.log("/dapk 호출.."); 	

//     let msg = req.body
//     console.log(msg.device_id)
//     // console.log(msg.filename)
//     res.download(__dirname+"/../update_apks/"+msg.filename)
// }



module.exports = {
    getZipfilelist,
    getDeviceswlist,
    getDeviceswlist_search,
    uploadZip,
    deleteZip,
    commandUpdateFirmWare,
    // downloadApk,
=======
const fs = require('fs');
const axios = require('axios')
require('dotenv').config({ path:'../.env'});
const updatefile_path = "update_zip"


const getZipfilelist = async (request, response, next) => {
    console.log('c_getZipfilelist')


    const path = __dirname.concat("/../",updatefile_path);

    let result = {data:[]}


    const rowPathItem = fs.readdirSync(path);

    for(j = 0; j < rowPathItem.length; j++){

        const getT = fs.statSync(path.concat('/',rowPathItem[j])).mtime        // node js 는 시스템 로컬 타임과 관계없이 UTC로 반환함
        const CreateDay = new Date(getT).toLocaleString()       // 한국 시간 변환

        const sendFileListData ={
            id: rowPathItem[j],
            u_time: CreateDay,
        }

        result.data.push(sendFileListData)

    }



    response.send(result);
}

const getDeviceswlist = async (request, response, next) => {  
    console.log('c_getDeviceswlist')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceupdatelist'),
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

const getDeviceswlist_search = async (request, response, next) => {  
    console.log('c_getDeviceswlist_search')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/deviceupdatelist/search'),
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

const uploadZip = async (request, response, next) => {
    console.log('c_UploadZip')

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


const deleteZip = async (request, response, next) => {
    console.log('c_deleteZip')

    const msg = request.body
    const modelitem = msg.modelitem


    let result = {
        isDeleted:true,
        errorMessage:""
    }

    if(modelitem){
        try{
            fs.unlinkSync(__dirname.concat("/../",updatefile_path,"/",modelitem))
        }catch(err){
            result.isDeleted = false
            result.errorMessage = "모델삭제에 실패했습니다."
            console.log(err)
        }
    
        if(response.error){
            result.isDeleted = false
            result.errorMessage = response.error
        }

    }else{
        result.isDeleted = false
        result.errorMessage = "모델삭제에 실패했습니다."
    }


    response.send(result);
}

const commandUpdateFirmWare = async (request, response, next) => {  
    console.log('c_commandUpdateFirmWare')

    const msg = request.body
    const device_id = msg.id
    const modelfile = msg.modelfile


    // console.log(msg)
    // console.log(request.headers.host)

    let result = {
        isUpdated:true,
        errorMessage:""
    }


    // console.log(request.protocol+"//"+request.headers.host+"/"+model+"/app-debug.apk")

    const path = modelfile


    if(!fs.existsSync(__dirname.concat("/../",updatefile_path,"/",modelfile))){
        result.isUpdated = false
        result.errorMessage = "업데이트할 zip가 존재하지 않습니다."
        response.send(result);
        return
    }

    

    try{

        comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/command/udfw'),
            headers:{
                Authorization: `Bearer ${request.session.user.name}`,
            },
            data:{
                Id:device_id,
                Location:path,
            }
        })

        console.log(comfirm.data)

        response.send(result);

    }catch(e){

        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            result.isUpdated = false
            result.errorMessage = e
            response.send(result);
        }
    }

   
        
    

}

// const downloadApk = async (request, response, next) => {
//     console.log("/dapk 호출.."); 	

//     let msg = req.body
//     console.log(msg.device_id)
//     // console.log(msg.filename)
//     res.download(__dirname+"/../update_apks/"+msg.filename)
// }



module.exports = {
    getZipfilelist,
    getDeviceswlist,
    getDeviceswlist_search,
    uploadZip,
    deleteZip,
    commandUpdateFirmWare,
    // downloadApk,
>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
}