import React, { useState } from "react";
import '../styles/PeopleLike.css';
import '../styles/People.css';

import Keyword from "./Keyword";
import like from '../images/Like.png';
import bad from '../images/bad.png';
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

function PeopleLike({ side, matchRequestId, name, profileIcon, universityName, major, grade, classOf, age, brief, keywords }) {
  const [ selectLike, setSelectLike ] = useState('');
  const [ likeText, setLikeText ] = useState('좋아요');
  const [ badText, setBadText ] = useState('매칭 실패');
  const [ showBadImage, setShowBadImage ] = useState(true);
  const [ showLikeImage, setShowLikeImage ] = useState(true);

  const token = localStorage.getItem('accessToken');

  const acceptMatchRequest = () => {
    fetch(`http://54.80.162.117:8080/matches/${matchRequestId}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Match request accepted:', data);
    })
    .catch(error => {
      console.error('Error accepting match request:', error);
    });
  };
  const rejectMatchRequest = () => {
    fetch(`http://54.80.162.117:8080/matches/${matchRequestId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Match request accepted:', data);
    })
    .catch(error => {
      console.error('Error accepting match request:', error);
    });
  };


  const onClickLikeButton = (e) => {
    setSelectLike('accept');
    setLikeText('매칭 완료!');
    setShowLikeImage(false);
    acceptMatchRequest();
  }

  const onClickBadButton = (e) => {
    setSelectLike('reject');
    setBadText('매칭 실패');
    setShowBadImage(false);
    rejectMatchRequest();
  }

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
          <img src={profileIconMap[profileIcon]} className="people_icon" />
        </div>

        <div className="people_text">
          <div className="people_name_container">
            <p className="people_name">{name}</p>
            {getStatusCircle(side)}
          </div>

          <p className="people_explain">{`${universityName} ${major} ${grade}학년`}</p>
          <p className="people_explain">{`${classOf}학번 / ${age}살`}</p>
          <p className="people_explain">{`"${brief}"`}</p>
        </div>
      </div>

      <div className="keyword_wrapper">
        {keywords.map((keyword, index) => (
          <Keyword key={index} value={keyword} />
        ))}
      </div>

      <div className="people_button">
        <button 
          className={`Like_button ${selectLike === 'accept' ? 'activeLike' : ""}`}
          onClick={onClickLikeButton}
        >
          {showLikeImage && <img src={like} className="Like_image"/>}
          {likeText}
        </button>

        <button 
          className={`Like_button ${selectLike === 'reject' ? 'activeBad' : ""}`}
          onClick={onClickBadButton}
        >
          {showBadImage && <img src={bad} className="Like_image"/>}
          {badText}
        </button>
      </div>
    </div>
  );
}

export default PeopleLike;