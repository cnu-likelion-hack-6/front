import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import PeopleLike from "../components/PeopleLike";

import rice from '../images/rice.png';
import '../styles/AcceptMain.css';


function AcceptMain() {
  const [matchRequests, setMatchRequests] = useState([]);
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch('https://melodic-valkyrie-f0a3b6.netlify.app/matches/acceptable-match-request', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  //       },
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       setMatchRequests(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching match requests:', error);
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    //fetch('https://melodic-valkyrie-f0a3b6.netlify.app/matches/acceptable-match-request', {
    fetch('https://melodic-valkyrie-f0a3b6.netlify.app/matches/acceptable-match-request', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('11',data)
      setMatchRequests(data);
    })
    .catch(error => {
      console.error('Error fetching match requests:', error);
    });
  }, []);

  return(
    <div className="acceptMain">
      <Logo />

      <div className="accept_count">
        <img src={rice} className="rice_image"/>
        내가 받은 밥약 신청
      </div>

      <div>
        {matchRequests.map((request) => (
          <PeopleLike
            key={request.matchRequestId}
            matchRequestId={request.matchRequestId}
            name={request.name}
            side={request.side}
            profileIcon={request.profileIcon}
            universityName={request.universityName}
            major={request.major}
            grade={request.grade}
            classOf={request.classOf}
            age={request.age}
            brief={request.brief}
            keywords={request.keywords}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default AcceptMain;