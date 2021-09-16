import React from "react"
import { useState } from "react";
import "./Detail.css"
import Recommend from "./recommend/Recommend.js"
import PlayList from "./playlist/PlayList.js"
import SeasonInfo from "./seasonInfo/SeasonInfo.js"
import NavBar from "./NavBar.js"
import SidebarContainer from "../container/SidebarContainer";

function Detail() {

const [isRecommend, setIsRecommend] = useState(false);
const [btnMsg, setBtmMsg] = useState("유저 추천")

const toggleRecommend = () => {
  if (isRecommend) {
    setIsRecommend(false)
    setBtmMsg("유저 전적")
  } else {
    setIsRecommend(true)
    setBtmMsg("유저 추천")
  }
}

  return(
    <div>
      <NavBar/>
      <div id="detail">
        <div id="info">
          <SeasonInfo/>
          <button onClick={toggleRecommend}>{ btnMsg }</button>
          {
            isRecommend
            ? <Recommend/>
            : <PlayList/>
          }
        </div>
        <SidebarContainer />
      </div>
    </div>
  )
}
export default Detail