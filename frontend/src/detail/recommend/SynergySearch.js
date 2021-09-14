import React, { useState } from "react"
import SynergyInfo from "./SynergyInfo"
function SynergySearch() {
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
  const synergy = {rate: "40%"}
  return (
    <div className="input-position">
      <input onChange={onChangeInput} value={inputText} placeholder="시너지 검색" className="middle-input" />
      <button onClick={onSearch}>검색</button>
      { isSearch ? <SynergyInfo info={synergy} /> : <div></div>}
    </div>
  )
}
export default SynergySearch;