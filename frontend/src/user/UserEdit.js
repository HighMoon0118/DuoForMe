import React, {useEffect, useState} from 'react'
import "./UserEdit.css"
import {lolNicknameEditAPI, getLolNicknameCount, passwordChange} from "../api/UserEditAPI"
import { deleteBlacklist } from '../api/UserAPI';
import { receiveRiot } from '../api/RUserAPI';
import NavBarContainer from "../container/NavBarContainer"
import { FiX } from "react-icons/fi"
function UserEdit({lolNickname, serviceNickname, blackList, email, lolEdit, serviceEdit, blacklist, userId, history} ) {
  let [lolNicknameChange, setLolNickname] = useState("")
  let [serviceNicknameChange, setServiceNickname] = useState("")
  let [password, setPassword] = useState("")
  let [passwordConfirm, setPasswordConfirm] = useState("")
  let [nicknameCount, setNicknameCount] = useState(null)
  let isBlack = false
  if (blackList.length > 0) {
    isBlack = true
  }
  useEffect(() => {
    getLolNicknameCount(lolNickname)
    .then((e) => {
      nicknameCount = e.data.count - 1
      setNicknameCount(nicknameCount)
    }).catch(() => {
      nicknameCount = 0
      setNicknameCount(nicknameCount)
    })
  },[])
  function lolNicknameEdit(e) {
    lolNicknameChange = e.target.value
    setLolNickname(lolNicknameChange)
  }
  function lolNicknameSubmit(e) {
    e.preventDefault()
    const lolNickname = {"lolNickname": lolNicknameChange}
    lolNicknameEditAPI(userId, lolNickname)
    .then((e) => {
      if (e.status === 200) {
        lolEdit(lolNicknameChange)
        receiveRiot(lolNicknameChange)
        getLolNicknameCount(lolNicknameChange)
        .then((e) => {
          nicknameCount = e.data.count - 1
          setNicknameCount(nicknameCount)
        }).catch(() => {
          nicknameCount = 0
          setNicknameCount(nicknameCount)
        })
        lolNicknameChange = ""
        setLolNickname(lolNicknameChange)
        alert(`${e.data.message}`)
      } else {
        alert(`수정에 실패하였습니다! 사유 : ${e.data.message}`)
      }
    })
    
    
  }
  function serviceNicknameEdit(e) {
    serviceNicknameChange = e.target.value
    setServiceNickname(serviceNicknameChange)
  }
  function serviceNicknameSubmit(e) {
    e.preventDefault()
    serviceEdit(serviceNicknameChange)
  }
  function blackListSubmit(blackId) {
    const blackUserId = { "blackUserId": blackId }
    deleteBlacklist(blackUserId).then(() => {
      let temp_blacklist = []
      for (let i = 0; i < blackList.length; i++) {
        if (blackList[i].blacklistId !== blackId) {
          temp_blacklist.push(blackList[i])
        }
      }
      blacklist(temp_blacklist)
      }
    )
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
    else {
      const data = {"password": password, "passwordConfirm": passwordConfirm}
      passwordChange(userId, data).then((res) => {
        if (res.status === 200) {
          alert("비밀번호 수정이 완료되었습니다!")
        }
      })
      setPassword("")
      setPasswordConfirm("")
    }
  }
  return(
    <div>
      <NavBarContainer history={history}/>
      <div className="user-edit-flex">
        <div id="user-edit-box">
          <h1>회원정보 수정</h1>
          <table>
            <tr>
              <th>이메일</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>서비스 닉네임</th>
              <td>{serviceNickname}</td>
            </tr>
            <tr>
              <th>롤 닉네임</th>
              <td>
                <form> 
                  <input onChange={lolNicknameEdit} className="input-box" value={lolNicknameChange} placeholder={lolNickname}/>
                  <button className="edit-btn" onClick={lolNicknameSubmit}>수정</button>
                  { nicknameCount ? <p className="margin-0">같은 닉네임을 가진 사람이 {nicknameCount}명입니다. </p> : <span></span>}
                </form>
              </td>
            </tr>
            <tr>
              <th>비밀번호 수정</th>
              <td>
                <div className="inline-block">
                  <div><input type="password" onChange={passwordEdit} value={password} className="input-box" placeholder="새로운 비밀번호를 입력하세요"/></div>
                  <div><input type="password" onChange={passwordConfirmEdit} value={passwordConfirm} className="input-box" placeholder="비밀번호 확인을 입력하세요"/></div>
                </div>
                <button className="password-btn" onClick={passwordSubmit}>수정</button>
              </td>
            </tr>
            {isBlack && <tr>
              <th>블랙리스트</th>
              <td>
                <div className="black-list-box ">
                  {blackList.map((black) => {
                  return <div id="black-list" key={black.userId}>
                    { black.lolNickname }
                    <FiX size="18" className="blacklist-btn" onClick={() => blackListSubmit(black.blacklistId)}/>
                  </div>
                  })}
                </div>
              </td>
            </tr>}
          </table>
        </div>
      </div>
    </div>
  )
}
export default UserEdit