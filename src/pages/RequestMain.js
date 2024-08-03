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
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://54.80.162.117:8080/matches/candidates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setCandidates(data);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });

    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // useEffect(() => {
  //   fetch('http://54.80.162.117:8080/matches/candidates', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Fetched candidates: ", data);
  //     setCandidates(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching candidates:', error);
  //   });
  // }, []);

  const onClickFilter = () => {
    navigate('/filter');
  }

  return (
    <div className="requestMain">
      <Logo />
      <button className="filterButton" onClick={onClickFilter}>
        필터 재설정
      </button>
      <CurrentStatus status={localStorage.getItem('selectedOption')} />

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
