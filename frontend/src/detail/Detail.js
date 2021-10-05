import React from "react"
import { useState } from "react";
import "./Detail.css"
import Recommend from "./recommend/Recommend.js"
import PlayList from "./playlist/PlayList.js"
import SeasonInfo from "./seasonInfo/SeasonInfo.js"
import SidebarContainer from "../container/SidebarContainer";
import NavBarContainer from "../container/NavBarContainer";

function Detail({match, history}) {
  //match.params.nickname에 소환사 이름 담겨져있음 이걸로 데이터 얻는 api 보내기
  console.log(match.params.nickname)
  const [isRecommend, setIsRecommend] = useState(false);
  const [btnMsg, setBtmMsg] = useState("유저 추천")

  const toggleRecommend = () => {
    if (!isRecommend) {
      setIsRecommend(true)
      setBtmMsg("유저 전적")
    } else {
      setIsRecommend(false)
      setBtmMsg("유저 추천")
    }
  }

  return(
    <div>
      <NavBarContainer history={history}/>
      <div id="detail">
        <div id="info">
          <SeasonInfo nickname={match.params.nickname}/>
          <button className="detail-btn" onClick={toggleRecommend}>{ btnMsg }</button>
          {
            isRecommend
            ? <Recommend/>
            : <PlayList/>
          }
        </div>
        <SidebarContainer history={history} />
      </div>
    </div>
  )
}
export default Detail