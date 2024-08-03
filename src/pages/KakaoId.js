import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/KakaoId.css';

import Input from '../components/Input';
import kakao1 from '../images/Kakao1.png';
import kakao2 from '../images/Kakao2.png';

function KakaoId() {
  const [ kakaoId, setKakaoId ] = useState('');
  const [ isError, setIsError ] = useState(true);
  const [ nextPage, setNextPage ] = useState('다음 단계');
  const navigate = useNavigate();

  const kakaoIdInput = () => {
    const token = localStorage.getItem('accessToken')

    fetch('http://54.80.162.117:8080/members/profile/kakaoId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({  kakaoId : kakaoId  })
    })
      .then(result => {
        if (result.message) {
          alert(result.message);
        }
        console.log("결과 : ", result);
        navigate('/SchoolCheck');
      })
  }

  const handleNextStep = () => {
    if (kakaoId === "") {
      setNextPage("카카오톡 아이디를 입력해주세요");
      setIsError(false);
      return;
    }
    setIsError(true);
    kakaoIdInput();
    setNextPage("다음 단계");
  }

  return(
    <div className="KakaoId">

      <div className="KakaoId_container">
        <div className="KakaoId_text">
          <p className="KakaoId_title">뱌뱍은 서로 카톡아이디를 교환해요!</p>
          <p className="KakaoId_text_0">카카오톡 아이디는 양측 모두</p>
          <p className="KakaoId_text_0">매칭된 후에 서로에게만 공개됩니다.</p>
        </div>

        <div className="KakaoId_Id">  
          <Input 
            title={"아이디 입력"} 
            value={kakaoId}
            onChange={setKakaoId}
          />
          <div className="KakaoId_explain">
            <p className="KakaoId_explain_1">내 아이디를 모르겠어요</p>
            <p className="KakaoId_explain_2">카카오톡 {'>'} 친구 추가 {'>'} ID로 추가 {'>'} 내 아이디 확인</p>
          </div>
        </div>

        <div className="KakaoId_step_container"> 
          <p className="KakaoId_step">STEP 1. 카카오톡 상단 확인 및 선택</p>
          <div className="KakaoId_step_image">
            <img className="image" src={kakao2} />
          </div>
          <p className="KakaoId_step">STEP 2. 카카오톡 ID로 친구추가 하기</p>
          <div className="KakaoId_step_image">
            <img className="image" src={kakao1} />
          </div>
        </div>
        
      </div>

      <button 
        onClick={ handleNextStep }
        className={`next_page ${!isError ? 'error' : ''}`}
      >{ nextPage }</button>
    </div>
  );
}

export default KakaoId;