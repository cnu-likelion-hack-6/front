import React from "react";
import "../styles/Logo.css";

import logo from "../images/logo.png";

function Logo() {
  return(
    <div>

      <div className="main_logo">
        <img className="logo" src={logo} />
      </div>

    </div>
  );
}

export default Logo;