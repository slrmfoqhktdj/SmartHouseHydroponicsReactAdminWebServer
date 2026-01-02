// import { useEffect, useState  } from "react"
// import { Navigate, Outlet  } from "react-router-dom"

const checkMainStatusAndParse = response => {

    if(response.ok){
        return response.json()
    }
    window.location.href="/login"
    return 
}

const checkStatusAndParse = response => {

    if(response.ok){
        return response.json()
    }

    response.json().then((data)=>{alert(data.message)})
    window.location.href="/login"
    return 
}

const FilecheckStatusAndParse = response => {

    if(response.ok){
        return response
    }

    response.json().then((data)=>{alert(data.message)})
    window.location.href="/login"
    return 
    
}

export const fetchMainGet = async(url) =>{

    return await fetch(`${process.env.REACT_APP_BACKURL}${url}`,{
        credentials: 'include'
    }).then(checkMainStatusAndParse)
    .catch(err => {
        alert("서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요." + err)
    });
}


export const fetchGet = async(url) =>{
    return await fetch(`${process.env.REACT_APP_BACKURL}${url}`,{
        credentials: 'include'
    }).then(checkStatusAndParse)
    .catch(err => {
        alert("서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요." + err)
    });
}

export const fetchPost = async(url,requestBody) =>{
    return await fetch(`${process.env.REACT_APP_BACKURL}${url}`, { 
        method: "post", // method :통신방법
        headers: {      // headers: API 응답에 대한 정보를 담음
          "content-type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(requestBody), //userData라는 객체를 보냄
    }).then(checkStatusAndParse)
    .catch(err => {
        alert("서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요." + err)
    });
}

export const fetchFile = async(url,requestBody) =>{
    return await fetch(`${process.env.REACT_APP_BACKURL}${url}`, { 
        method: "post", // method :통신방법
        credentials: 'include',
        body:requestBody, //userData라는 객체를 보냄
    }).then(checkStatusAndParse)
    .catch(err => {
        alert("서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요." + err)
    });
}

export const fetchDownFile = async(url) =>{
    return await fetch(`${process.env.REACT_APP_BACKURL}${url}`, { 
        credentials: 'include',
    }).then(FilecheckStatusAndParse)
    .catch(err => {
        alert("서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요." + err)
    });
} 



// export const ProtectedRoute = () => {
//     const [isAllowed, setIsAllowed] = useState(undefined)
//     // let isAllowed = undefined

//     // function timeout(delay) {
//     //     return new Promise( res => setTimeout(res, delay) );
//     // }

//     const loginAction = async () => {
//         // await timeout(1000);
//         const response = await fetch(`${process.env.REACT_APP_BACKURL}/checkLogin`, {
//             credentials: 'include'
//           }).catch(err =>{console.log(err)});
//         const res = await response.json();
//         // console.log(res)
//         setIsAllowed(res.isGuest)
//         // isAllowed = res.isGuest
//         return;
//     }

   


//     useEffect(()=>{
//         loginAction()
//     })
//     // loginAction()
    
    
//     if(isAllowed === undefined){
//         console.log("return null")
//         return null;
//     }

    

//     // if(!isAllowed){
//     //     console.log("return login")
//     //     return <Navigate to={"/login"}/>
//     // }else{
//     //     // return children? children : <Outlet/>
//     //     console.log("return outlet")
//     //     return <Outlet/>
//     // }

//     return isAllowed ?  <Outlet/>  : <Navigate to={"/login"} />
    
// }









