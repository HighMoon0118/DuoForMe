import React from 'react';
import "./Sidebar.css"
import Timer from "../../main/Timer"
import SuccessMatchingUser from './SuccessMatchingUser'

function Sidebar ({time, me, you, isMatching, changeMatching, myLine, yourLine}) {
  const successMatchingUser = [{id: 1, image: "img/userIcon1.jpg", userName: "소환사1"}, {id: 2, image: "img/userIcon1.jpg", userName: "소환사2"}, {id: 3, image: "img/userIcon1.jpg", userName: "소환사3"}]
  return (
    <div id="sidebar">
      <div className="fixed">
        <h1>SideBar</h1>
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
                <option value="">내 라인 선택</option>
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
                <option>상대방 라인 선택</option>
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="jungle">Jungle</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
        }
        <button className="matching-btn" onClick={ () => changeMatching(isMatching, new Date().getTime()) }>{ isMatching ? "매칭 중" : "매칭하기" }</button>
        {successMatchingUser.map((successUser) => <SuccessMatchingUser key={successUser.id} image={successUser.image} userName={successUser.userName} />)}
      </div>
    </div>
  )
}
export default Sidebar