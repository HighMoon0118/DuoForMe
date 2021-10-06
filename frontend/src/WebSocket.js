import React, {useRef, useState} from 'react';
import SockJsClient from 'react-stomp'
import MatchUserContainer from "./container/MatchUserContainer"

function WebSocket ({ isLogin, userId, lolNickname, isMatching, isMatched, canChat, chat,  duoName, duoId, isFolded,
                      changeMatching, matched, chatting, setDuo, setFolded, setChatable }) {

  const $websocket = useRef(null)
  

  
  const myMsg = {
    acceptMatching: true,
    exit: false,
    message: "",
    receiver: duoName,
    receiverId: duoId,
    sender: lolNickname,
    senderId: userId,
    startChatting: true,
    startMatching: true
  }
  const reset = () => {
    matched(false)
    setFolded(false)
    setChatable(false)
    chatting([])
  }
  
  const addChat = (msg) => {
    const tmp = [...chat]
    tmp.push({
      senderId: msg.senderId,
      sender: msg.sender,
      message: msg.message
    })
    chatting(tmp)
  }
  console.log(chat);

  const accpetOrRefuse = (answer) => {
    if ($websocket.current) {
      const tmp = {...myMsg, acceptMatching: answer}
      $websocket.current.sendMessage(`/accept/${userId}`, JSON.stringify(tmp));
      if (!answer) {
        alert("매칭을 거절했습니다.")
        reset()
      }
    }
  }

  const sendMsg = (message) => {
    if ($websocket.current) {
      const tmp = {...myMsg, message: message}
      $websocket.current.sendMessage(`/pub/${userId}`, JSON.stringify(tmp));
      addChat(tmp)
    }
  }
  
  const exitMatching = () => {
    if ($websocket.current) {
      const tmp = {...myMsg, exit: true}
      $websocket.current.sendMessage(`/pub/${userId}`, JSON.stringify(tmp));
      alert("매칭이 종료되었습니다.")
      reset()
    }
  }
  
  // {process.env.REACT_BASE_URL+"socket"}
  return (
      <div>
          {
            isLogin && <SockJsClient
              url = "https://duofor.me/api/socket"
              topics = {[`/sub/${userId}`]}
              onMessage = {msg => {
                

                console.log(msg)
                
                if (msg.exit) {  // 상대방이 종료했을 경우
                  alert("상대방이 매칭을 나갔습니다.")
                  reset()
                } else if (msg.startMatching) {  // 매칭이 시작됐을 경우
                  if (msg.startChatting) {  // 채팅이 시작됐을 경우(매칭이 성사됨)
                    if (!canChat) {
                      setChatable(true)
                    }
                    addChat(msg)
                    if (isFolded) {
                      console.log(msg.sender);
                      alert(`${msg.sender} : ${msg.message}`)
                    }
                  }
                  else {  // 성사되기전 매칭됨을 알림
                    changeMatching(isMatching, null)
                    setDuo(msg.sender, msg.senderId)
                    matched(true)
                  }
                } else {
                  alert("상대방이 매칭을 거절했습니다.")
                  reset()
                }
              }}
              ref = {$websocket}
            />
          }
          <MatchUserContainer accpetOrRefuse={accpetOrRefuse}  sendMsg={sendMsg} exitMatching={exitMatching}
           /> 
      </div>
  );
}

export default WebSocket;