import React, { useState } from "react";
import "./LoginSignin.css";


import user_icon from "../asets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

export const LoginSignin = () => {

  const [action,setAction] = useState("Login");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action==="Login"?<div></div>:<div className="input">
          <img src={user_icon} alt="User icon" />
          <input type="text" placeholder="Name" />
        </div>}
        

        <div className="input">
          <img src={email_icon} alt="Email icon" />
          <input type="email" placeholder="Email Id" />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {action==="Sign Up"?<div></div>:<div className="forgot-password">
        Lost Password? <span>Click Here!</span>
      </div>}

      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
  );
};