import React from "react"
import { useState, useEffect } from "react";
import "./Detail.css"
import Recommend from "./recommend/Recommend.js"
import PlayList from "./playlist/PlayList.js"
import SeasonInfo from "./seasonInfo/SeasonInfo.js"
import SidebarContainer from "../container/SidebarContainer";
import NavBarContainer from "../container/NavBarContainer";
import { receiveRiot, getGameData, getRUserInfo } from '../api/RUserAPI';

function Detail({match, history, rUser, gameData, setRUser, setGameData}) {
  //match.params.nickname에 소환사 이름 담겨져있음 이걸로 데이터 얻는 api 보내기
  const [isRecommend, setIsRecommend] = useState(false);
  const [btnMsg, setBtmMsg] = useState("유저 추천")
  
  useEffect(() => {
    receiveRiot(match.params.nickname).then(() => {
      getGameData(match.params.nickname).then(res => {
        console.log(res.data);
        setGameData(res.data)
        getRUserInfo(match.params.nickname).then(res => {
          console.log(res.data);
          setRUser(res.data)
        })
      })
    })
  }, [match.params.nickname])

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
          <SeasonInfo nickname={match.params.nickname} gameData={gameData} rUser={rUser} />
          <button className="detail-btn" onClick={toggleRecommend}>{ btnMsg }</button>
          {
            isRecommend
            ? <Recommend/>
            : <PlayList gameData={gameData}/>
          }
        </div>
        <SidebarContainer history={history} />
      </div>
    </div>
  )
}
export default Detail