import React from 'react';
import "./Login.css"
import { useState } from 'react';
import { getId, login, getBlacklist, getMatchinghistory } from '../api/UserAPI';
import NavBarContainer from "../container/NavBarContainer";
function Login ({history, getUserInfo, blacklist, getMatching}) {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [error, setErrors] = useState({
    email: "",
    password: "",
  });

  const [check, setCheck] = useState({
    email: false,
    password: false
  })

  const checkEmail = (e) => {
    setData({...data, email: e.target.value})
    var regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    if (e.target.value.length > 0 && !regExp.test(e.target.value)) {
      setErrors({
        ...error,
        email: "올바른 이메일 주소를 입력하세요"
      })
      setCheck({...check, email: false})
    } else {
      setErrors({
        ...error,
        email: ""
      })
      setCheck({...check, email: true})
    }
  } 

  const setPassword = (e) => {
    setData({...data, password: e.target.value})
    if (e.target.value.length > 0) {
      setCheck({...check, password: true})
    } else {
      setCheck({...check, password: false})
    }
  }
  const doLogin = () => {
    login(data).then(res => {
      localStorage.setItem('token', res.data.token)
      history.goBack()
      getId().then(res => {
        getUserInfo(res.data)
      })
      getBlacklist().then(res => {
        let blackList = []
        for (let i = 0; i < res.data.length; i++) {
          let black = res.data[i].blackUser
          black["blacklistId"] = res.data[i].blacklistId
          blackList.push(black)
        }
        blacklist(blackList)
      })
      getMatchinghistory().then(res => {
        getMatching(res.data)
      })
    })
  }

  return (
    <div>
      <NavBarContainer history={history}/>
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
            <button className="login-btn" disabled={!check.email || !check.password} onClick={doLogin} >로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;