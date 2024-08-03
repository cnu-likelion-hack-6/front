import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Main.css";

import Logo from "../components/Logo";
import Icon from "../components/Icon";
import imagePaths from '../components/ProfileImages';
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

function Main() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');
  const [ profileName, setProfileName ] = useState('');
  const [ profileIcon, setProfileIcon ] = useState(null);

  useEffect(() => {
    fetch('http://54.80.162.117:8080/members/my', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setProfileName(data.name || '');
      setProfileIcon(data.profileIcon ? data.profileIcon : null);
      console.log("profile : ", profileIcon);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
  }, []);


  const handleComplete = () => {
    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }
    localStorage.setItem('selectedOption', selectedOption);

    const token = localStorage.getItem('accessToken');

    fetch('http://54.80.162.117:8080/filters/side', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ state: selectedOption })
    })
    .then(result => {
      console.log('State successfully updated:', result);
      alert('설정이 완료되었습니다.');
      navigate('/RequestMain');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`서버 오류가 발생했습니다: ${error.message}`);
    });
  };

  return(
    <div className="main">
      <Logo />

      <div className="main_text">
        <div className="main_icon">
          {profileIcon && <img src={profileIconMap[profileIcon]} className="icon_img" />}
        </div>
        
        <p className="main_name">{profileName}님!</p>
        <p className="main_explain">밥약 신청 상태를 설정해 주세요</p>
        <p className="main_explain">설정을 바탕으로 랜덤 매칭이 시작됩니다</p>
      </div>

      <button 
        className={`main_button ${selectedOption === 'BUYER' ? 'active' : ''}`}
        onClick={() => setSelectedOption('BUYER')}
      >후배님 밥 먹어요~ <br/>(사줄래요)</button>
      <button 
        className={`main_button ${selectedOption === 'TAKER' ? 'active' : ''}`}
        onClick={() => setSelectedOption('TAKER')}
      >
        선배님 밥 사주세요~ <br/>(사주세요)
      </button>
      <button 
        className={`main_button ${selectedOption === 'BOTH' ? 'active' : ''}`}
        onClick={() => setSelectedOption('BOTH')}
      >
        둘 다 좋아요~
      </button>
      
      <button 
        className="SchoolCheck_button"
        onClick={handleComplete}
      >설정 완료</button>
{/* 
      <div>
        <Link to={`/SignUp`}>page</Link>
      </div>
      <div>
        <Link to={`/RequestMain`}>RequestMain</Link>
      </div> */}
    </div>
  );
}

export default Main;