import React from 'react';
import "./Sidebar.css"
import Timer from "../../main/Timer"
import SuccessMatchingUser from './SuccessMatchingUser'

function Sidebar ({time, me, you}) {
  const successMatchingUser = [{id: 1, image: "img/userIcon1.jpg", userName: "소환사1"}, {id: 2, image: "img/userIcon1.jpg", userName: "소환사2"}, {id: 3, image: "img/userIcon1.jpg", userName: "소환사3"}]
  return (
    <div id="sidebar">
      <h1>SideBar</h1>
      <Timer time={time}/>
      { me && <h3>내 라인: {me}</h3> }
      { you && <h3>듀오 라인: {you}</h3>}
      {successMatchingUser.map((successUser) => <SuccessMatchingUser key={successUser.id} image={successUser.image} userName={successUser.userName} />)}
      
    </div>
  )
}
export default Sidebar