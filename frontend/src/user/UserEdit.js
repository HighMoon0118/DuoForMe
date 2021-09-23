import React, {useState} from 'react'
import "./UserEdit.css"

function UserEdit({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blackListEdit} ) {
  // let blackLists = []
  // for (let i = 0; i < Object.keys(blackList).length; i++) {
  //   blackLists.push({id: i, nickname: blackList[i]})
  // }
  let [blacklist, setBlacklist] = useState(blackList)
  let [lolNicknameChange, setLolNickname] = useState("")
  let [serviceNicknameChange, setServiceNickname] = useState("")
  function lolNicknameEdit(e) {
    lolNicknameChange = e.target.value
    setLolNickname(lolNicknameChange)
  }
  function lolNicknameSubmit(e) {
    e.preventDefault()
    lolEdit(lolNicknameChange)
    lolNicknameChange = ""
    setLolNickname(lolNicknameChange)
  }
  function serviceNicknameEdit(e) {
    serviceNicknameChange = e.target.value
    setServiceNickname(serviceNicknameChange)
  }
  function serviceNicknameSubmit(e) {
    e.preventDefault()
    serviceEdit(serviceNicknameChange)
  }
  function blackListSubmit(black) {
    let temp = []
    for (let j = 0; j < Object.keys(blackList).length; j++) {
      if (blacklist[j] !== black) {
        temp.push(blackList[j])
      }
    }
    blacklist = temp
    setBlacklist(blacklist)
    blackListEdit(blacklist)
  }
  return(
    <div id="user-edit-box">
      <h1>회원정보 수정</h1>
      <table>
        <tr>
          <th>이메일</th>
          <td>{email}</td>
        </tr>
        <tr>
          <th>롤 닉네임</th>
          <td>
            <form> 
              <input onChange={lolNicknameEdit} className="input-box" value={lolNicknameChange} placeholder={lolNickname}/>
              <button onClick={lolNicknameSubmit}>수정</button>
            </form>
          </td>
        </tr>
        <tr>
          <th>서비스 닉네임</th>
          <td>
            <input onChange={serviceNicknameEdit} value={serviceNicknameChange} className="input-box" placeholder={serviceNickname}/>
            <button onClick={serviceNicknameSubmit}>수정</button>
          </td>
        </tr>
        <tr>
          <th>블랙리스트</th>
          <td>
            {blacklist.map((black) => {
            return <div id="black-list">
              { black }
              <button onClick={() => blackListSubmit(black)}>X</button>
            </div>
          })}
          </td>
        </tr>
        
      </table>
    </div>
  )
}
export default UserEdit