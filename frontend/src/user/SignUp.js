import React from 'react';
import "./SignUp.css"
import { useState } from 'react';


function SignUp () {

  const [error, setErrors] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState("")

  const textChange = (e) => {
    setPassword(e.target.value)
  }

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

  const checkPassword = (e) => {
      if (password.length > 0 && e.target.value.length > 0 && password !== e.target.value) {
        setErrors({
          ...error,
          password: "비밀번호가 일치하지 않습니다"
        })
      } else {
        setErrors({
          ...error,
          password: ""
        })
      }
  }

  const checkGameName = (e) => {
    console.log("체크");
  }

  return (
    <div id="signup">
      <div className="mt-30"><h1>SignUp</h1></div>
      <div className="ta-left">
        <div className="mt-30">
          <div>이메일</div>
          <input className="mt-5" type="text" placeholder="이메일을 입력하세요."  onChange={checkEmail}/>
          <div className="input-msg">{error.email}</div>
        </div>
        <div className="mt-30">
          <div>비밀번호</div>
          <input className="mt-5" type="password" placeholder="비밀번호를 입력하세요." onChange={textChange}/>
          <div>비밀번호 확인</div>
          <input className="mt-5" type="password" placeholder="비밀번호를 입력하세요." onChange={checkPassword}/>
          <div className="input-msg">{error.password}</div>
        </div>
        <div className="mt-30">
          <div>소환사 이름</div>
          <input className="mt-5" type="text" placeholder="소환사 이름을 입력하세요." onChange={checkGameName}/>
        </div>
      </div>
      <div>
          <button className="signup-btn">회원 가입</button>
        </div>
    </div>
  );
}

export default SignUp;