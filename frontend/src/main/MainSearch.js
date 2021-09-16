import React, { useState } from "react"
function MainSearch() {
  const [ inputText, setInputText ] = useState("")
  function onChangeInput(e) {
    setInputText(e.target.value)
  }
  return (
    <div id="main-search">
      <div className="center">
        <input onChange={onChangeInput} value={inputText} placeholder="소환사명" className="large-input" />
        <button>검색</button>
        <p>{inputText}</p>
      </div>
    </div>
  )
}
export default MainSearch;