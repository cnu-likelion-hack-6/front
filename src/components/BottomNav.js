import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import "../styles/RequestMain.css";
import "../styles/BottomNav.css";

import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import icon1_selected from "../images/icon1_selected.png";
import icon2_selected from "../images/icon2_selected.png";
import icon3_selected from "../images/icon3_selected.png";
import icon4_selected from "../images/icon4_selected.png";

function BottomNav() {
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    if (location.pathname.includes("RequestMain")) {
      setSelectedIcon("requestMain");
    } else if (location.pathname.includes("AcceptMain")) {
      setSelectedIcon("acceptMain");
    } else if (location.pathname.includes("MatchingMain")) {
      setSelectedIcon("MatchingMain");
    } else if (location.pathname.includes("MessageMain")) {
      setSelectedIcon("MessageMain");
    }
  }, [location.pathname]);

  return (
    <div className="main">
      <nav className="navbar">
        <div className="icon">
          <Link to="/RequestMain" onClick={() => setSelectedIcon("requestMain")}>
            <img 
              className="icon_image" 
              src={selectedIcon === "requestMain" ? icon1_selected : icon1} 
              alt="Request Main"
            />
          </Link>
        </div>

        <div className="icon">
          <Link to="/AcceptMain" onClick={() => setSelectedIcon("acceptMain")}>
            <img 
              className="icon_image" 
              src={selectedIcon === "acceptMain" ? icon2_selected : icon2} 
              alt="Accept Main"
            />
          </Link>
        </div>

        <div className="icon">
          <Link to="/MatchingMain" onClick={() => setSelectedIcon("MatchingMain")}>
            <img 
              className="icon_image" 
              src={selectedIcon === "MatchingMain" ? icon3_selected : icon3} 
              alt="Matching Main"
            />
          </Link>
        </div>

        <div className="icon">
          <Link to="/MessageMain" onClick={() => setSelectedIcon("MessageMain")}>
            <img 
              className="icon_image" 
              src={selectedIcon === "MessageMain" ? icon4_selected : icon4} 
              alt="Message Main"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BottomNav;
