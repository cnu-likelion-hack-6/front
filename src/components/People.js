import React from "react";
import "../styles/People.css";

import Keyword from "./Keyword";
import requestImage from '../images/requestImage.png';
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


function People({ memberId, profileIcon, name, universityName, major, grade, classOf, age, brief, keywords, side }) {
  
  const handleMatchRequest = () => {
    const token = localStorage.getItem('accessToken');
    console.log('Access Token:', token);

    fetch('http://54.80.162.117:8080/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ targetMemberId: memberId })
    })
    .then(result => {
      console.log("result: ", result);
      if (result.status === 200) {
        alert("매치 요청을 성공적으로 보냈습니다.");
      } else {
        alert(result.message || "매치 요청에 실패했습니다. 다시 시도해 주세요.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    });
  };

  const getStatusCircle = (side) => {
    if (side === 'BUYER') return <div className="status_circle red"></div>;
    if (side === 'TAKER') return <div className="status_circle blue"></div>;
    if (side === 'BOTH') return <div className="status_circle green"></div>;
    return null;
  };

  return(
    <div className="people">
      <div className="people_container">
        <div className="people_profile">
          <img src={profileIconMap[profileIcon]} className="people_icon"/>
        </div>

        <div className="people_text">
          <div className="people_name_container">
            <p className="people_name">{name}</p>
            {getStatusCircle(side)}
          </div>
          <p className="people_explain">{universityName} {major} {grade}학년</p>
          <p className="people_explain">{classOf}학번 / {age}살</p>
          <p className="people_explain">"{brief}"</p>
        </div>

        <div className="requestImage_wrapper" onClick={handleMatchRequest}>
          <img className="requestImage" src={requestImage} />  
        </div>

      </div>

      <div className="keyword_wrapper">
        {keywords.map((keyword, index) => (
          <Keyword key={index} value={keyword} />
        ))}
      </div>
    </div>
  );
}

export default People;