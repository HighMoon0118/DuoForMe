import React, {useState} from 'react';
import "./NavBar.css"
import { Link } from 'react-router-dom';
import { cancelMatching } from "../api/MatchingAPI"
import {BiSearch} from "react-icons/bi"
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
  function enterkey() {
    if (window.event.keyCode === 13) {
      history.push(`/detail/${inputText}`)
    }
  }
  const goHome = () => {
    history.push('/')
  }
  return (
    <div id="navbar">
      <div onClick={goHome} className="logo"><h1>Duofor.me</h1></div>
      <div className="m-30">
        <div className="input-search mw-10">
          <input onChange={onChangeInput} value={inputText} placeholder="소환사명" className="small-input" onKeyUp={enterkey} />
          <BiSearch size="20" color="black" onClick={onSearch}/>
        </div>
        {/* <input onChange={onChangeInput} value={inputText} placeholder="소환사명"  className="input-search mw-10" />
        <button onClick={onSearch}>검색</button> */}
        { isLogin && <span className="mw-10 log-out" onClick={logOut}>로그아웃</span> }
        { isLogin && <Link to="/useredit" style={{ textDecoration: "none", color: "white", marginLeft:"5px"}}>회원정보</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white"}} to="/login">로그인</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white", marginLeft:"5px"}} to="/signup">회원가입</Link> }
      </div>
    </div>
  );
}

export default NavBar;