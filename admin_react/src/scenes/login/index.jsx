import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {fetchPost} from "../../communication/handlefetch"

// function LoginView(props) {
function LoginView() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnKeyPress = e =>{
      if(e.key === 'Enter'){
        handleLogin();
      }
    }


    function handleLogin (){
      if(id.length === 0|| password.length === 0){
        alert("빈칸을 채워주세요")
      }else{
        const userData = {
          email: id,
          password: password,
        };
        fetchPost("/authenticate",userData)
          .then((json) => {           
            if(json?.isLogin===true){
              // props.setMode(true);
              
              // <Navigate  to = "/"/>
              navigate("/")
          }
          else {
            alert(json?.errorMessage)
          }
        }).catch((err)=>{});
      }
    }
    
    
    return <>
      <div className='loging-bg'>
          <div className="login-div">
            <h2 className='login-title'>관리자</h2>
            
            <div className="form">
              <input className="login-id-tv" type="text" name="username" placeholder="이메일" onKeyDown={handleOnKeyPress} onChange={event => {
                setId(event.target.value.trim());
              }} />
              <input className="login-pw-tv" type="password" name="pwd" placeholder="비밀번호" onKeyDown={handleOnKeyPress} onChange={event => {
                setPassword(event.target.value.trim());
              }} />
              <p></p>
              <input className="login-btn" type="submit" value="로그인" onClick={handleLogin} />
              <p></p>
            </div>
          </div>
      </div>
      
      
    </> 
  }


  
export default LoginView;