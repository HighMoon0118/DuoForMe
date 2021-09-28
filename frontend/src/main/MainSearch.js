import React, { useState } from "react"
function MainSearch({history}) {
  const [ inputText, setInputText ] = useState("")
  function onChangeInput(e) {
    setInputText(e.target.value)
  }
  function onSearch(e) {
    e.preventDefault()
    history.push("/detail/" + `${inputText}`)
  }
  return (
    <div id="main-search">
      <div className="center">
        <form>
          <input onChange={onChangeInput} value={inputText} placeholder="소환사명" className="large-input" />
          <button onClick={onSearch}>검색</button>
        </form>
      </div>
    </div>
  )
}
export default MainSearch;