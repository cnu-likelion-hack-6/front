import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Profile3.css';

import Icon from "../components/Icon";
import Button from "../components/Button";
import MultiButton from "../components/MultiButton";

const keywordMap = {
  "진로": "CAREERS",
  "취업": "EMPLOYMENT",
  "학업": "ACADEMICS",
  "연애": "RELATIONSHIPS",
  "친구": "FRIENDS",
  "기타": "ETC"
};

const keywords = Object.keys(keywordMap);

function Profile3({ profileData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIcon } = location.state || profileData;
  
  const [introduction, setIntroduction] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setIsNextEnabled(introduction.trim().length > 0);
  }, [introduction]);

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((kw) => kw !== keyword)
        : [...prevSelected, keyword]
    );
  };

  const handleNextClick = () => {
    const mappedKeywords = selectedKeywords.map(kw => keywordMap[kw]);
    const finalProfileData = {
      ...profileData,
      brief: introduction,
      keywords: mappedKeywords,
    };
    console.log('result: ', finalProfileData);

    fetch('http://54.80.162.117:8080/members/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(finalProfileData),
    })
    .then(result => {
      navigate('/filter');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    });
  };
  

  return (
    <div className="Profile">
      <div className="Profile_title_wrapper">
        <p className="Profile_title">프로필을 설정해 주세요</p>
        <p className="Profile_title_1">자신을 표현할 수 있는 한 줄 소개를 작성하고</p>
        <p className="Profile_title_1">관심 키워드를 선택해 주세요!</p>
      </div>

      <div>
        <Icon imagePath={selectedIcon} />
        <p className="profile3-name">{profileData.name}</p>
      </div>

      <div className="profile3-input-container">
        <p className="profile3-input-title">한 줄 소개 입력하기</p>
        <input 
          className="profile3-input"
          type="text" 
          value={introduction} 
          onChange={(e) => setIntroduction(e.target.value)} 
        />
      </div>

      <div className="profile3-keyword-container">
        <p className="keyword-title">관심 키워드 선택</p>
        <div className="keyword-grid">
          {keywords.map((keyword) => (
            <MultiButton 
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              isSelected={selectedKeywords.includes(keyword)}
            >
              {keyword}
            </MultiButton>
          ))}
        </div>
      </div>

      <div className="next-button-container">
        <Button 
          onClick={handleNextClick} 
          isActive={isNextEnabled}
          isNextButton={true}
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}

export default Profile3;
