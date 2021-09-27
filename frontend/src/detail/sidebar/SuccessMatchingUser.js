import React from 'react'
import "./Sidebar.css"

function SuccessMatchingUser(props) {
  return(
    <div className="user-box">
      <div className="user-img">
        <img src={props.image} alt="user icon" height="40px" width="40px" />
      </div>
      <div className="user-info">
        <p className="margin-0">{props.userName}</p>
      </div>
    </div>
  )
}
export default SuccessMatchingUser