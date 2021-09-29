import React, {useRef} from 'react';
import SockJsClient from 'react-stomp'
import { useRef } from 'react';

function WebSocket ({userId, isLogin}) {

  const $websocket = useRef(null)

  return (
      <div>
          <SockJsClient
            url = {process.env.REACT_BASE_URL+"socket"}
            topics = {[`/sub/${userId}`]}
            onMessage = {msg => {
              console.log(msg)
            }}
            ref = {$websocket}
          />
      </div>
  );
}

export default WebSocket;