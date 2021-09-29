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
    $websocket.current.sendMessage ('/pub/userId');
  }
  // {process.env.REACT_BASE_URL+"socket"}
  return (
      <div>
          {
            isLogin && <SockJsClient
              url = "http://localhost:8080/socket"
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