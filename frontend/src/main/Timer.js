import React, {useState} from "react"

function Timer(props) {
  let [ time, setTime ] = useState(props.time)
  setTimeout(()=>{
    time += 1
    setTime(time)
  }, 1000)
  let hour = "00"
  let min = parseInt(time / 60).toString().length < 2 ?  "0" + parseInt(time / 60).toString() : parseInt(time / 60).toString()
  if (time >= 3600) {
    hour = parseInt(min / 60).toString().length < 2 ? "0" + parseInt(min / 60).toString() : parseInt(min / 60).toString()
    min = parseInt(min % 60).toString().length < 2 ? "0" + parseInt(min % 60).toString() : parseInt(min % 60).toString()
  }
  let second = (time % 60).toString().length < 2 ? "0" + (time % 60).toString() : (time % 60).toString()
  return (
    <div>
      {Math.floor((new Date().getTime() - new Date(props.time))/ 1000) ? <div>{hour} : { min } : {second}</div> : <div></div>}
    </div>
  )
}

export default Timer;