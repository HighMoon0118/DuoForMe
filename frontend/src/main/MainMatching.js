import React, { useState } from "react"

function Matching() {
  const [ selectLine, setLine ] = useState({
    me: "",
    you: "",
  })
  const { me, you } = selectLine
  function selectChange(e) {
    const { name, value } = e.target
    setLine({
      ...selectLine,
      [name] : value
    })
  }

  return (
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
            timer
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
        <button className="matching-btn">매칭</button>
      </div>
    </div>
  )
}

export default Matching;