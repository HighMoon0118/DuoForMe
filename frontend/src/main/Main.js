import React, {useState} from "react"
import "./Main.css"
import MainSearch from "./MainSearch"
import { Link } from "react-router-dom"
import MainMatchingContainer from "../container/MainMatchingContainer"
import Modal from "./Modal"
function Main() {
  const [ modalOpen, setModalOpen ] = useState(false);

  const openModal = () => {
      setModalOpen(true);
  }
  const closeModal = () => {
      setModalOpen(false);
  }
  return (
    <div id="main">
      <div className="text-left nav-padding">
        {/* 로그인, 회원가입 페이지 만들면 링크로 바뀌게 */}
        <span>회원가입</span>
        <span>로그인</span>
      </div>
      <h1 className="main-font">
        Duofor.me
      </h1>
      <MainSearch />
      <MainMatchingContainer />
      <Link to="/detail">디테일 확인</Link>
      <button onClick={ openModal }>모달팝업</button>
      <Modal open={ modalOpen } close={ closeModal } header="Modal heading">모달 내용 아아아</Modal>
    </div>
  )
}

export default Main;