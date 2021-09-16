import React from 'react';
import "./Sidebar.css"
import Timer from "../../main/Timer"

function Sidebar ({time}) {
  return (
    <div id="sidebar">
      <h1>SideBar</h1>
      <Timer time={time}/>
    </div>
  )
}
export default Sidebar