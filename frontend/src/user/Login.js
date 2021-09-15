import React from 'react';
import "./Login.css"
import { useState } from 'react';


function Login () {

  const [error, setErrors] = useState({
    email: "",
    password: "",
  });

  const checkEmail = (e) => {
    var regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    if (e.target.value.length > 0 && !regExp.test(e.target.value)) {
      setErrors({
        ...error,
        email: "올바른 이메일 주소를 입력하세요"
      })
    } else {
      setErrors({
        ...error,
        email: ""
      })
    }
  } 

  const checkPassword = (e) => { // 나중에  비밀번호 일치하는지 안하는지 체크
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
      if (e.target.value.length > 0 && !regExp.test(e.target.value)) {
        setErrors({
          ...error,
          password: "비밀번호가 틀렸습니다"
        })
      } else {
        setErrors({
          ...error,
          password: ""
        })
      }
  }

  return (
    <div className="login-body">
      <div className="mt-30"><h1>Login</h1></div>
      <div className="ta-left">
        <div className="mt-30">
          <div>이메일</div>
          <input className="mt-10" type="text" placeholder="이메일을 입력하세요."  onChange={checkEmail}/>
          <div className="input-msg">{error.email}</div>
        </div>
        <div className="mt-30">
          <div>비밀번호</div>
          <input className="mt-10" type="password" placeholder="비밀번호를 입력하세요." onChange={checkPassword}/>
          <div className="input-msg">{error.password}</div>
        </div>
      </div>
      <div>
          <button className="login-btn">로그인</button>
      </div>
    </div>
  );
}

export default Login;