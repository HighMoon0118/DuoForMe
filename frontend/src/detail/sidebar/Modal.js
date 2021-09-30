import React, {useState} from 'react'
import { BsStarFill } from 'react-icons/bs'
import { matchingCreditAdd, blacklistAdd } from '../../api/UserEditAPI'
import { getMatchinghistory, getBlacklist } from '../../api/UserAPI'
const Modal = ({open, close, matchinghistoryId, userName, userId, getMatching, blacklist}) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // const { open, close, matchinghistoryId, userName, userId, getMatching } = props
  let [clicked, setClicked] = useState([false, false, false, false, false])
  let [credit, setCredit] = useState(null)
  let [black, setBlack] = useState(false)
  function handleStarClick(index) {
    let tempClick = [...clicked]
    for (let i=0; i <5; i++) {
      tempClick[i] = i <= index ? true : false
    }
    setClicked(tempClick)
    setCredit(index + 1)
  }
  function handleBlack(blackcheck) {
    setBlack(!blackcheck)
  }
  function creditSubmit(e) {
    e.preventDefault()
    if (credit === null) {
      alert("별점을 입력해주세요!")
    }else {
      const creditObj = {"credit": credit}
      matchingCreditAdd(matchinghistoryId, creditObj).then(() => {
        getMatchinghistory().then(res => {
          console.log(res.data)
          getMatching(res.data)
        })
      })
    }
    if (credit !== null && black) {
      const blackUserId = {"blackUserId": userId}
      blacklistAdd(blackUserId).then(() => {
        getBlacklist().then(res => {
          let blackList = []
          for (let i = 0; i < res.data.length; i++) {
            let black = res.data[i].blackUser
            black["blacklistId"] = res.data[i].blacklistId
            blackList.push(black)
          }
          blacklist(blackList)
        })
      })
    }
    close()
  }
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={ open ? 'openModal modal' : 'modal' }>
      { open ? (  
        <section>
          <header>
            <div style={{marginTop: "30px", width: "300px"}}>
              매칭 유저 이름: {userName}
              <button className="close" onClick={close}>X</button>
            </div>
          </header>
          <main>
            <form> 
              <div style={{marginTop: "15px"}}>
                <BsStarFill className={clicked[0] ? "star-color-yellow" : "star-color-gray"} size="25" onClick={() => handleStarClick(0)}/>
                <BsStarFill className={clicked[1] ? "star-color-yellow" : "star-color-gray"} size="25" onClick={() => handleStarClick(1)}/>
                <BsStarFill className={clicked[2] ? "star-color-yellow" : "star-color-gray"} size="25" onClick={() => handleStarClick(2)}/>
                <BsStarFill className={clicked[3] ? "star-color-yellow" : "star-color-gray"} size="25" onClick={() => handleStarClick(3)}/>
                <BsStarFill className={clicked[4] ? "star-color-yellow" : "star-color-gray"} size="25" onClick={() => handleStarClick(4)}/>
              </div>
              <div style={{marginTop: "5px"}}>
                <input type="checkbox" value={black} onClick={() => handleBlack(black)}></input>
                <span>블랙리스트 추가</span>
              </div>
              <button className="submit-btn" onClick={(e) => {creditSubmit(e)}}>제출</button>
            </form>
          </main>
        </section>
      ) : null }
    </div>
  )
}
export default Modal