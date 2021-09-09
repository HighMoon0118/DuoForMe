import React from "react"
import "./Main.css"
import MainSearch from "./MainSearch"
import MainMatching from "./MainMatching"
function Main() {
  return (
    <div>
      <div className="text-left nav-padding">
        {/* 로그인, 회원가입 페이지 만들면 링크로 바뀌게 */}
        <span>회원가입</span>
        <span>로그인</span>
      </div>
      <h1 className="main-font">
        Duofor.me
      </h1>
      <MainSearch />
      <MainMatching />
    </div>
  )
}

export default Main;