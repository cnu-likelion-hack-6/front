import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import RequestPeople from "../components/People";
import CurrentStatus from "../components/CurrentStatus";

import "../styles/RequestMain.css";
import "../styles/Main.css";

function RequestMain() {
  const [candidates, setCandidates] = useState([]);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || 'BOTH');
  const navigate = useNavigate();

  // GET : 밥약(매치) 가능한 사람들 조회
    useEffect(() => {
        fetch('/api/matches/candidates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched candidates: ", data);
                setCandidates(data);
            })
            .catch(error => {
                console.error('Error fetching candidates:', error);
            });
    }, []);


  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch('/api/matches/candidates', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       setCandidates(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching candidates:', error);
  //     });
  //
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // PUT : 밥약 신청 상태 변경
  const handleStatusChange = (newStatus) => {
    setSelectedOption(newStatus);
    localStorage.setItem('selectedOption', newStatus);

    fetch('/api/filters/side', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ state: newStatus })
    })
    .then(result => {
      console.log('State successfully updated:', result);
      alert('설정이 완료되었습니다.');
    })
    .catch(error => {
      console.error('Error updating state:', error);
    });
  }

  // 필터 재설정 
  const onClickFilter = () => {
    navigate('/filter');
  }

  return (
    <div className="requestMain">
      <Logo />
      <button className="filterButton" onClick={onClickFilter}>
        필터 재설정
      </button>
      <CurrentStatus 
        //status={localStorage.getItem('selectedOption')} 
        status={selectedOption}
        onStatusChange={handleStatusChange}
      />

      <div>
        {candidates && candidates?.map((candidate) => (
          <RequestPeople
            key={candidate.memberId}
            memberId={candidate.memberId}
            side={candidate.side}
            profileIcon={candidate.profileIcon}
            name={candidate.name}
            universityName={candidate.universityName}
            major={candidate.major}
            grade={candidate.grade}
            classOf={candidate.classOf}
            age={candidate.age}
            brief={candidate.brief}
            keywords={candidate.keywords}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default RequestMain;
