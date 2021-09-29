import React, {useState} from 'react';
import "./NavBar.css"
import { Link } from 'react-router-dom';
import { cancelMatching } from "../api/MatchingAPI"
function NavBar ({isLogin, logout, isMatching, history}) {
  const [ inputText, setInputText ] = useState("")
  function onChangeInput(e) {
    setInputText(e.target.value)
  }
  function onSearch() {
    history.push(`/detail/${inputText}`)
  }
  const logOut = () => {
    if (isMatching) {
      cancelMatching()
    }
    localStorage.setItem("token", "")
    logout()
  }

  return (
    <div id="navbar">
      <div className="logo"><h1>Duofor.me</h1></div>
      <div className="m-30">
        <input onChange={onChangeInput} value={inputText} placeholder="소환사명"  className="input-search mw-10" />
        <button onClick={onSearch}>검색</button>
        { isLogin && <span className="mw-10 log-out" onClick={logOut}>로그아웃</span> }
        { isLogin && <Link to="/useredit">회원정보</Link> }
        { !isLogin && <Link className="mw-10" to="/login">로그인</Link> }
        { !isLogin && <Link className="mw-10" to="/signup">회원가입</Link> }
      </div>
    </div>
  );
}

export default NavBar;