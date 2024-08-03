import React, { useState } from "react";
import '../styles/PeopleLike.css';

import peopleKakaoId from '../images/peopleKakaoId.png';
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

function ShowKakaoId({profileIcon}) {
  return (
    <div className="ShowKakaoId">
      <div className="ShowKakaoId_profile">
        <img src={profileIconMap[profileIcon]} className="people_icon"/>
      </div>
      <p className="people_name">박지훈</p>
      <p className="people_explain">충남대학교 전자공학과 2학년</p>
      <div className="ShowKakaoId_id">
        <img src={peopleKakaoId} className="peopleKakao_image" />
        <p>rladk99!@</p>
      </div>
    </div>
  );
}

export default ShowKakaoId;