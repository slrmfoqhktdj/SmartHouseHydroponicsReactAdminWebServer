// check if the user is authenticated


const isAuthenticated = (request, response, next) => {
    if(!request.session.user){

        return response.status(401).json({message:"세션이 만료되었습니다. 다시 로그인해주세요."})
        
    }
    
    next()
}



const isLogin = (request, response, next) => {
    if(request.session.user){
        console.log("auth")
        // return response.status(400)

        return response.send({
            isLogin:true,
            errorMessage :""
        })
    }
    
    next()
}

// // check if the user is guest
// const isGuest = (request, response, next) => {

//     console.log('loginpage')
//     if(request.session.user){
//         return response.redirect(response.locals.base + 'dashboard/demo-one/' + response.getLocale())
//         // sendGuestData.isGuest = true
//         // return response.send(sendGuestData)
//     }
//     next()
// }



module.exports = {
    isLogin,
    isAuthenticated,
}