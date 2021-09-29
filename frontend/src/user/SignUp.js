import React from 'react';
import "./SignUp.css"
import { useState } from 'react';
import { checkEmail, checkNickname, signup, receiveRiot } from '../api/UserAPI';


function SignUp ({ history }) {

  const [error, setErrors] = useState({
    email: "",
    serviceNickname: "",
    password: "",
  });

  const [data, setData] = useState({
    email: "",
    serviceNickname: "",
    password: "",
    lolNickname: ""
  })

  const [check, setCheck] = useState({
    email: false,
    serviceNickname: false,
    password: false
  })

  const [password, setPassword] = useState("")

  const textChange = (e) => {
    setPassword(e.target.value)
  }

  const doSignup = async () => {
    var possible = true

    await checkEmail(data.email).then(res => {
    }).catch(error => {
      possible = false
      console.log(error);
      return 
    })
    
    if (possible) {
      signup(data).then(res => {
        history.goBack()
        receiveRiot(data.lolNickname)
      }).catch(error => {
        console.log(error);
      })
    } else {
      alert("이미 가입된 이메일 주소입니다.")
    }
  }

  const checkMyEmail = (e) => {
    var regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    setData({
      ...data,
      email: e.target.value
    })
    if (e.target.value.length > 0 && !regExp.test(e.target.value)) {
      setCheck({ ...check, email: false })
      setErrors({ ...error, email: "올바른 이메일 주소를 입력하세요" })
    } else {
      setErrors({ ...error, email: "" })
      setCheck({ ...check, email: true })
    }
  } 

  const checkPassword = (e) => {
    setData({ ...data, password: e.target.value })
    if (password.length > 0 && e.target.value.length > 0 && password !== e.target.value) {
      setCheck({ ...check, password: false })
      setErrors({ ...error, password: "비밀번호가 일치하지 않습니다" })
    } else {
      setCheck({ ...check, password: true })
      setErrors({ ...error, password: "" })
    }
  }
  
  const checkMyNickname = (e) => {

    setData({ ...data, serviceNickname: e.target.value })

    checkNickname(e.target.value).then(res => {
      setCheck({ ...check, serviceNickname: true })
      setErrors({ ...error, serviceNickname: "" })
    }).catch(() => {
      setCheck({ ...check, serviceNickname: false })
      setErrors({ ...error, serviceNickname: "중복된 닉네임입니다." })
    })
  }

  const checkMyGameName = (e) => {
    setData({ ...data, lolNickname: e.target.value })
  }

  return (
    <div id="signup">
      <div className="mt-30"><h1>SignUp</h1></div>
      <div className="ta-left">
        <div className="mt-30">
          <div>이메일</div>
          <input className="mt-5" type="text" placeholder="이메일을 입력하세요."  onChange={checkMyEmail}/>
          <div className="input-msg">{error.email}</div>
        </div>
        <div className="mt-30">
          <div>닉네임</div>
          <input className="mt-5" type="text" placeholder="닉네임을 입력하세요"  onChange={checkMyNickname}/>
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
          <input className="mt-5" type="text" placeholder="소환사 이름을 입력하세요." onChange={checkMyGameName}/>
        </div>
      </div>
      <div>
          <button className="signup-btn" onClick={doSignup}
          disabled={!check.email || !check.serviceNickname || !check.password }>회원 가입</button>
        </div>
    </div>
  );
}

export default SignUp;