<<<<<<< HEAD
const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getDashboardData = async (request, response, next) => {
    console.log('c_getDashboardData')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/dashboardlist'),
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


}



module.exports = {
    getDashboardData,
=======
const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getDashboardData = async (request, response, next) => {
    console.log('c_getDashboardData')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/if/dashboardlist'),
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


}



module.exports = {
    getDashboardData,
>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
}