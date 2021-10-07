import React, {useEffect, useState, useRef} from "react"

function MatchingTimer({ canChat, isFolded, exit }) {

  let [ time, setTime ] = useState(400)
  const timerId = useRef(null)
  useEffect(() => {
    timerId.current = setTimeout(()=>{
      time -= 4
      setTime(time)
    }, 1000)

    if (canChat) {
      return () => {
        setTime(400)
        clearTimeout(timerId.current)
      }
    }
  
    return () => {
      clearTimeout(timerId.current)
    }
  },)

  if (time <= 0) {
    exit()
  }

  const progressStyle = {
    width: "400px",
    display: "inline-block",
    margin: "20px auto 10px auto",
    backgroundColor: "#ddd"
  }

  const barStyle = {
    height: "10px",
    width: String(time)+"px",
    backgroundColor: "#4CAF50"
  }

  if (isFolded) return null

  return (
    <div id="matching-timer">
      <div style={progressStyle}><div style={barStyle}></div></div>
    </div>
  )
}

export default MatchingTimer;