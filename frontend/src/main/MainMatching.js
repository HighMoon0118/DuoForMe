import React, { useState } from "react"
import Timer from "./Timer"

function MainMatching({isMatching, changeMatching, time}) {
  const [ selectLine, setLine ] = useState({
    me: "",
    you: "",
  })
  // const [ isMatching, setIsMatching ] = useState(false)
  const { me, you } = selectLine
  function selectChange(e) {
    const { name, value } = e.target
    setLine({
      ...selectLine,
      [name] : value
    })
  }
  // function toggleMatching() {
  //   setIsMatching(!isMatching)
  // }
  return (
    <div id="main-matching">
      <div className="center">
        <div className="matching-box">
          <div className="center-group"> 
            <div className="select-box">
              <img className="line-image" alt="라인 이미지" src={"img/" + me + ".png"} />
              <select value={ me } onChange={ selectChange } name="me" className="drop-down">
                <option value="">내 라인 선택</option>
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="jungle">Jungle</option>
                <option value="support">Support</option>
              </select>
            </div>
            <div className="timer">
              {/* 지금 그냥 숫자 올라가는 걸로 해뒀는데 다른곳에서도 같은 시간 보이게 redux로 고쳐야하지 않을까 */}
              { isMatching ? <Timer time={time}/> : <div></div>}
            </div>
            <div className="select-box">
              <img className="line-image" alt="라인 이미지" src={"img/" + you + ".png"} />
              <select value={ you } onChange={ selectChange } name="you" className="drop-down">
                <option>상대방 라인 선택</option>
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="jungle">Jungle</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          <button className="matching-btn" onClick={ () => changeMatching(isMatching, new Date().getTime()) }>{ isMatching ? "매칭 중" : "매칭하기" }</button>
        </div>
      </div>
    </div>
  )
}

export default MainMatching;