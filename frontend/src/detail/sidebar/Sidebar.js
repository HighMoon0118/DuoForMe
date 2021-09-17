import React from 'react';
import "./Sidebar.css"
import Timer from "../../main/Timer"

function Sidebar ({time, me, you}) {
  return (
    <div id="sidebar">
      <h1>SideBar</h1>
      <Timer time={time}/>
      { me && <h3>내 라인: {me}</h3> }
      { you && <h3>듀오 라인: {you}</h3>}
      
    </div>
  )
}
export default Sidebar