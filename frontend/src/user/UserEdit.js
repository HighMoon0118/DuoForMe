import React, {useState} from 'react'
import "./UserEdit.css"

function UserEdit({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blackListEdit} ) {
  let [blacklist, setBlacklist] = useState(blackList)
  let [lolNicknameChange, setLolNickname] = useState("")
  let [serviceNicknameChange, setServiceNickname] = useState("")
  let [password, setPassword] = useState("")
  let [passwordConfirm, setPasswordConfirm] = useState("")
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
  function passwordEdit(e) {
    password = e.target.value
    setPassword(password)
  }
  function passwordConfirmEdit(e) {
    passwordConfirm = e.target.value
    setPasswordConfirm(passwordConfirm)
  }
  function passwordSubmit(e) {
    e.preventDefault()
    // 비밀번호 변경 api 보내기
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다")
    }
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
            <form>
              <input onChange={serviceNicknameEdit} value={serviceNicknameChange} className="input-box" placeholder={serviceNickname}/>
              <button onClick={serviceNicknameSubmit}>수정</button>
            </form>
          </td>
        </tr>
        <tr>
          <th>비밀번호 수정</th>
          <td>
            <div className="inline-block">
              <div><input type="password" onChange={passwordEdit} value={password} className="input-box" placeholder="새로운 비밀번호를 입력하세요"/></div>
              <div><input type="password" onChange={passwordConfirmEdit} value={passwordConfirm} className="input-box" placeholder="새로운 비밀번호를 입력하세요"/></div>
            </div>
            <button className="password-btn" onClick={passwordSubmit}>수정</button>
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