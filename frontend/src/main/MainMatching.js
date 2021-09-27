import React from "react"
import { cancelMatching, requestMatching } from "../api/MatchingAPI";
import Timer from "./Timer"

function MainMatching({isMatching, changeMatching, time, me, you, myLine, yourLine}) {
  function matching() {
    if (me === "" || you === "") {
      alert("매칭 정보를 입력해주세요")
    }
    else {
      if (!isMatching) {
        const position = {"myPosition": me, "duoPosition": you}
        requestMatching(position)
      }
      else {
        cancelMatching()
      }
      changeMatching(isMatching, new Date().getTime())
    }
  }
  return (
    <div id="main-matching">
      <div className="center">
        <div className="matching-box">
          <div className="center-group"> 
            <div className="select-box">
              <img className="line-image" alt="라인 이미지" src={"img/" + me + ".png"} />
              <select value={ me } onChange={(e) => myLine(e.target.value)} name="me" className="drop-down">
                <option value="">내 라인 선택</option>
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="jungle">Jungle</option>
                <option value="support">Support</option>
              </select>
            </div>
            <div className="timer">
              { isMatching && <Timer time={time}/>}
            </div>
            <div className="select-box">
              <img className="line-image" alt="라인 이미지" src={"img/" + you + ".png"} />
              <select value={ you } onChange={(e) => yourLine(e.target.value)} name="you" className="drop-down">
                <option>상대방 라인 선택</option>
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="jungle">Jungle</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          <button className="matching-btn" onClick={ matching }>{ isMatching ? "매칭 중" : "매칭하기" }</button>
        </div>
      </div>
    </div>
  )
}

export default MainMatching;