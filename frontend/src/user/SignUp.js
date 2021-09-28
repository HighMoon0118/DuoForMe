import React from 'react';
import "./SignUp.css"
import { useState } from 'react';
import { signup } from '../api/UserAPI';


function SignUp ({ history }) {

  const [error, setErrors] = useState({
    email: "",
    serviceNickname: "",
    password: "",
    lolNickname: "",
  });

  const [data, setData] = useState({
    email: "",
    serviceNickname: "",
    password: "",
    lolNickname: ""
  })

  const [password, setPassword] = useState("")

  const textChange = (e) => {
    setPassword(e.target.value)
  }

  const doSignup = () => {
    signup(data).then(res => {
      history.goBack()
    })
  }

  const checkEmail = (e) => {
    var regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    setData({
      ...data,
      email: e.target.value
    })
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
    setData({
      ...data,
      password: e.target.value
    })
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
  
  const checkNickname = (e) => {
    setData({
      ...data,
      serviceNickname: e.target.value
    })
  }

  const checkGameName = (e) => {
    setData({
      ...data,
      lolNickname: e.target.value
    })
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
          <div>닉네임</div>
          <input className="mt-5" type="text" placeholder="닉네임을 입력하세요"  onChange={checkNickname}/>
          <div className="input-msg">{error.serviceNickname}</div>
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
          <div className="input-msg">{error.lolNickname}</div>
        </div>
      </div>
      <div>
          <button className="signup-btn" onClick={doSignup}>회원 가입</button>
        </div>
    </div>
  );
}

export default SignUp;