import React, {useState} from "react"
import "./Main.css"
import MainSearch from "./MainSearch"
import { Link } from "react-router-dom"
import MainMatchingContainer from "../container/MainMatchingContainer"
import Modal from "../MatchingModal"
import { cancelMatching } from "../api/MatchingAPI"
function Main({history, isLogin, logout, isMatching}) {
  const [ modalOpen, setModalOpen ] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const logOut = () => {
    if (isMatching) {
      cancelMatching()
    }
    localStorage.setItem("token", "")
    logout()
    
  }
  return (
    <div id="main">
      <div className="text-left nav-padding">
        { isLogin && <span className="mw-10 log-out" onClick={logOut}>로그아웃</span> }
        { isLogin && <Link to="/useredit" style={{ textDecoration: "none", color: "white", marginLeft:"10px"}}>회원정보</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white"}} to="/login">로그인</Link> }
        { !isLogin && <Link className="mw-10" style={{ textDecoration: "none", color: "white", marginLeft:"10px"}} to="/signup">회원가입</Link> }
        
      </div>
      <h1 className="main-font">
        Duofor.me Jenkins되냐? webhook도 되나?
      </h1>
      <MainSearch history={history}/>
      <MainMatchingContainer history={history}/>
      <button onClick={ openModal }>모달팝업</button>
      <Modal open={ modalOpen } close={ closeModal }>모달 내용 아아아</Modal>
    </div>
  )
}

export default Main;