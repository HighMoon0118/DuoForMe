import React, {useRef, useEffect} from 'react';
import SockJsClient from 'react-stomp'

function WebSocket ({userId, isLogin}) {

  const $websocket = useRef(null)

  useEffect(() => {
    if (isLogin) {
      console.log("hi");
    }
  })

  const sendMessage = () => {
    const chat = {
      receiver: "",
      sender: "",
      message: "안녕하세요"
    }
    $websocket.current.sendMessage (`/pub/${userId}`, JSON.stringify(chat));
    console.log("sendMessage", userId, isLogin);
  }
  
  // {process.env.REACT_BASE_URL+"socket"}
  return (
      <div>
          {
            isLogin && <SockJsClient
              url = "http://localhost:8080/api/socket"
              topics = {[`/sub/${userId}`]}
              onMessage = {msg => {
                console.log("받은 메세지"+msg)
              }}
              ref = {$websocket}
            />
          }
          <button onClick={sendMessage}>웹소켓</button>
      </div>
  );
}

export default WebSocket;