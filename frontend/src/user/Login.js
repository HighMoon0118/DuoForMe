import React from 'react';
import "./Login.css"
import { useState } from 'react';
import { login } from '../api/UserAPI';


function Login () {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [error, setErrors] = useState({
    email: "",
    password: "",
  });

  const [check, setCheck] = useState(false)

  const checkEmail = (e) => {
    var regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    if (e.target.value.length > 0 && !regExp.test(e.target.value)) {
      setErrors({
        ...error,
        email: "올바른 이메일 주소를 입력하세요"
      })
      setCheck(false)
      setData({...data, email: e.target.value})
    } else {
      setErrors({
        ...error,
        email: ""
      })
      if (e.target.value.length > 0) { 
        setCheck(true)
      }
    }
  } 

  const setPassword = (e) => {
    setData({...data, password: e.target.value})
  }
  const doLogin = () => {
    var res = login(data)
    console.log(res)
  }

  return (
    <div id="login">
      <div className="mt-30"><h1>Login</h1></div>
      <div className="ta-left">
        <div className="mt-30">
          <div>이메일</div>
          <input className="mt-10" type="text" placeholder="이메일을 입력하세요."  onChange={checkEmail}/>
          <div className="input-msg">{error.email}</div>
        </div>
        <div className="mt-30">
          <div>비밀번호</div>
          <input className="mt-10" type="password" placeholder="비밀번호를 입력하세요." onChange={setPassword}/>
          <div className="input-msg">{error.password}</div>
        </div>
      </div>
      <div>
          <button className="login-btn" disabled={!check} onClick={doLogin}>로그인</button>
      </div>
    </div>
  );
}

export default Login;