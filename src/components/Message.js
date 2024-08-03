import React from "react";

import "../styles/People.css";

import image01 from '../images/profile01.png';
import image02 from '../images/profile02.png';
import image03 from '../images/profile03.png';
import image04 from '../images/profile04.png';
import image05 from '../images/profile05.png';
import image06 from '../images/profile06.png';
import image07 from '../images/profile07.png';
import image08 from '../images/profile08.png';
import image09 from '../images/profile09.png';

const profileIconMap = {
  ICON_1: image01,
  ICON_2: image02,
  ICON_3: image03,
  ICON_4: image04,
  ICON_5: image05,
  ICON_6: image06,
  ICON_7: image07,
  ICON_8: image08,
  ICON_9: image09
};


function Message({ profileIcon, name, universityName, major, grade, classOf, message }) {
  return(
    <div className="message">
      <div className="message_container">
        <div className="message_profile">
          <img src={profileIconMap[profileIcon]} className="people_icon"/>
        </div>

        <div className="people_text">
          <div className="people_name_container">
            <p className="people_name">{name}</p>
          </div>
          <p className="people_explain">{`${universityName} ${major} ${grade}학년`}</p>
        </div>
      </div>
      
      <div className="message_text">
        {/* <p>오늘 밥 같이 먹어서 좋았어 ~</p> */}
        {/* <p>다음에 족보 필요하면 언제든지 연락해 !</p> */}
        <p>{message}</p>
      </div>

    </div>
    
  );
}

export default Message;