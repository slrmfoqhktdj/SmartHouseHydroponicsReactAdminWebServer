// const axios = require('axios')
const jwtMiddleware = require('../middlewares/jwt')
require('dotenv').config({ path:'../.env'});

const getDashboardData = async (request, response, next) => {
    console.log('c_getDashboardData')


    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/if/dashboardlist'),
        //     headers: { Authorization: `Bearer ${request.session.user.name}` },
        // })
        
        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/if/dashboardlist',null,null)
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



module.exports = {
    getDashboardData,
}