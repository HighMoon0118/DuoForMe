import React from "react"
import "./Main.css"
import MainSearch from "./MainSearch"
import { Link } from "react-router-dom"
import MainMatchingContainer from "../container/MainMatchingContainer"
function Main({history, isLogin, logout}) {

  const logOut = () => {
    localStorage.setItem("token", "")
    logout()
    
  }
  return (
    <div id="main">
      <div className="text-left nav-padding">
        { isLogin && <span className="mw-10 log-out" style={{fontSize: "20px"}} onClick={logOut}>로그아웃</span> }
        { isLogin && <Link to="/useredit" style={{ textDecoration: "none", color: "white", marginLeft:"10px", fontSize: "20px"}}>회원정보</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white", fontSize: "20px"}} to="/login">로그인</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white", marginLeft:"10px", fontSize: "20px"}} to="/signup">회원가입</Link> }
        
      </div>
      <div className="main-box">
        <h1 className="main-font">
          Duofor.me
        </h1>
        <MainSearch history={history}/>
        <MainMatchingContainer history={history}/>
        </div>
    </div>
  )
}

export default Main;