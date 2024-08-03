import React, { useState } from "react";

import Keyword from "./Keyword";
import ShowKakaoId from "./ShowKakaoId";
import PeopleMessage from "./PeopleMessage";
import thankIcon from '../images/chat.png';
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
import '../styles/PeopleLike.css';

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

function PeopleKakao({ matchId, name, profileIcon, memberId, kakaoId, universityName, major, grade, classOf, age, brief, keywords }) {
  const [showKakaoId, setShowKakaoId] = useState(false);
  const [showThankIcon, setShowThankIcon] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [thankMessage, setThankMessage] = useState("");

  const handleKakaoClick = () => {
    if (showKakaoId) {
      setShowKakaoId(false);
      setTimeout(() => setShowThankIcon(true), 0); 
    } else {
      setShowKakaoId(true);
      setShowThankIcon(false); 
    }
  };

  const handleThankClick = () => {
    setShowMessage(true);
    setShowThankIcon(false);
  };

  const handleSendMessage = () => {
    setShowMessage(false);
    setThankMessage("");
  };

  return (
    <div className="people">
      {!showKakaoId && !showMessage && (
        <>
          <div className="people_container">
            <div className="people_profile">
              <img src={profileIconMap[profileIcon]} alt="profile" className="people_icon" />
            </div>

            <div className="people_text">
              <p className="people_name">{name}</p>
              <p className="people_explain">{universityName} {major} {grade}학년</p>
              <p className="people_explain">{classOf}학번 / {age}살</p>
              <p className="people_explain">"{brief}"</p>
            </div>
          </div>

          <div className="keyword_wrapper">
            {keywords.map((keyword, index) => (
              <Keyword key={index} value={keyword} />
            ))}
          </div>

          <div className="peopleKakao_button">
            <button className="peopleKakao_button" onClick={handleKakaoClick}>
              <img src={peopleKakaoId} className="peopleKakao_image" />
              카톡 아이디 보기
            </button>
          </div>
        </>
      )}

      {showKakaoId && (
        <div onClick={handleKakaoClick}>
          <ShowKakaoId kakaoId={kakaoId} />
        </div>
      )}

      {!showKakaoId && showThankIcon && !showMessage && (
        <div className="thank_icon" onClick={handleThankClick}>
          <img src={thankIcon} className="thank_icon_image" />
        </div>
      )}

      {showMessage && (
        <PeopleMessage 
          matchId={matchId}
          thankMessage={thankMessage}
          setThankMessage={setThankMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default PeopleKakao;