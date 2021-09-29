import React, { useState } from "react"
import {BiSearch} from "react-icons/bi"
function MainSearch({history}) {
  const [ inputText, setInputText ] = useState("")
  function onChangeInput(e) {
    setInputText(e.target.value)
  }
  function onSearch() {
    history.push(`/detail/${inputText}`)
  }
  function enterkey() {
    if (window.event.keyCode === 13) {
      history.push(`/detail/${inputText}`)
    }
  }
  return (
    <div id="main-search">
      <div className="input-box">
        <input onChange={onChangeInput} value={inputText} placeholder="소환사명" className="large-input" onKeyUp={enterkey} />
        {/* <button onClick={onSearch}>검색</button> */}
        <BiSearch size="35" color="black" onClick={onSearch}/>
      </div>
    </div>
  )
}
export default MainSearch;