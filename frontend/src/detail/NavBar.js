import React from 'react';
import { useState } from "react";
import "./NavBar.css"
import { Link } from 'react-router-dom';

function NavBar () {

  const [isLogin, setIsLogin] = useState(false)

    const logOut = () => {
      if (isLogin) {
        setIsLogin(false)
      }
    }

    return (
      <div className="navbar">
        <div className="logo"><h1>Duofor.me</h1></div>
        <div className="m-30">
          <input className="input-search mw-10" type="text" />
          { isLogin && <span className="mw-10 log-out" onClick={logOut}>로그아웃</span> }
          { !isLogin && <Link className="mw-10" to="/login">로그인</Link> }
          { !isLogin && <Link className="mw-10" to="/signup">회원가입</Link> }
        </div>
      </div>
    );
}

export default NavBar;