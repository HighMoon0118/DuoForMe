import React from 'react';
import "./Sidebar.css"
import Timer from "../../main/Timer"
import SuccessMatchingUser from './SuccessMatchingUser'
import { cancelMatching, requestMatching } from "../../api/MatchingAPI";

function Sidebar ({time, me, you, isMatching, changeMatching, myLine, yourLine, isLogin, history, successMatchingUser}) {
  // const successMatchingUser = [{id: 1, image: "img/userIcon1.jpg", userName: "소환사1"}, {id: 2, image: "img/userIcon1.jpg", userName: "소환사2"}, {id: 3, image: "img/userIcon1.jpg", userName: "소환사3"},
  // {id: 4, image: "img/userIcon1.jpg", userName: "소환사1"}, {id: 5, image: "img/userIcon1.jpg", userName: "소환사2"}, {id: 6, image: "img/userIcon1.jpg", userName: "소환사3"}, {id: 7, image: "img/userIcon1.jpg", userName: "소환사7"},
  // {id: 8, image: "img/userIcon1.jpg", userName: "소환사3"}, {id: 9, image: "img/userIcon1.jpg", userName: "소환사7"}]
  // let matchingLength = Object.keys(successMatchingUser).length
  // let scroll = false
  // if (matchingLength > 6) {
  //   scroll = true
  // }
  function matching() {
    if (!isLogin) {
      alert("로그인이 필요합니다!")
      history.push("/login")
    }
    else if (me === "default" || you === "default") {
      alert("매칭 정보를 입력해주세요")
    }
    else {
      if (!isMatching) {
        const position = {"myPosition": me, "duoPosition": you}
        requestMatching(position)
        .then(
          changeMatching(isMatching, new Date().getTime())
        )
      }
      else {
        cancelMatching()
        .then(
          changeMatching(isMatching, null)
        )
      }
    }
  }
  return (
    <div id="sidebar">
      <div className="fixed">
        <div>
          {isMatching? <h1>매칭정보</h1> : <h1>매칭신청</h1>}
          {isMatching ? 
            <div> 
              <Timer time={time}/>
              { me && <h3>내 라인: {me}</h3> }
              { you && <h3>듀오 라인: {you}</h3>}
            </div> :
            <div>
              <div className="select-box">
                <span>내 라인: </span>
                <select value={ me } onChange={(e) => myLine(e.target.value)} name="me" className="drop-down">
                  <option value="default">내 라인 선택</option>
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                  <option value="jungle">Jungle</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="select-box">
                <span>상대방 라인: </span>
                <select value={ you } onChange={(e) => yourLine(e.target.value)} name="you" className="drop-down">
                  <option value="default">상대방 라인 선택</option>
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                  <option value="jungle">Jungle</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>
          }
          <button className="matching-btn" onClick={ matching }>{ isMatching ? "매칭취소" : "매칭하기" }</button>
        </div>
        {/* { scroll ? <div className="success-user-scroll">
          {successMatchingUser.map((successUser) => <SuccessMatchingUser key={successUser.matchinghistoryId} image={successUser.matchedUser.profileIconId} userName={successUser.matchedUser.lolNickname} matchinghistoryId={successUser.matchinghistoryId} userId={successUser.matchedUser.userId} isCredit={successUser.credit}/>)}
        </div> : <div className="success-user">
          {successMatchingUser.map((successUser) => <SuccessMatchingUser key={successUser.matchinghistoryId} image={successUser.matchedUser.profileIconId} userName={successUser.matchedUser.lolNickname} matchinghistoryId={successUser.matchinghistoryId} userId={successUser.matchedUser.userId} isCredit={successUser.credit}/>)}
        </div>} */}

      </div>
    </div>
  )
}
export default Sidebar