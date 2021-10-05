import React, { useState } from "react"
import SynergyInfo from "./SynergyInfo"
import {BiSearch} from "react-icons/bi"
function SynergySearch({history}) {
  const [ inputText, setInputText ] = useState("")
  let [ isSearch, setSearch ] = useState(false)
  function onChangeInput(e) {
    setInputText(e.target.value)
  }
  function onSearch(e) {
    if (inputText) {
      isSearch = true
    }else{
      isSearch = false
    }
    setSearch(isSearch)
  }
  function enterkey() {
    if (window.event.keyCode === 13) {
      history.push(`/detail/${inputText}`)
    }
  }
  const synergy = {rate: "40%"}
  return (
    <div id="synergy-search">
      <div className="input-position">
        <input onChange={onChangeInput} value={inputText} placeholder="시너지 검색" className="middle-input" onKeyUp={enterkey} />
        <BiSearch size="30" color="black" onClick={onSearch}/>
      </div>
      { isSearch ? <SynergyInfo info={synergy} /> : <div></div>}
    </div>
  )
}
export default SynergySearch;