import React, { useEffect, useState } from "react";

import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import PeopleKakao from "../components/PeopleKakao";
import rice from '../images/rice.png';
import '../styles/AcceptMain.css';

function MatchingMain() {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('http://54.80.162.117:8080/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("peopleData : ", peopleData);
      setPeopleData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);


  return (
    <div className="acceptMain">
      <Logo />
      <div className="accept_count">
        <img src={rice} className="rice_image" />
        매칭 현황
      </div>
      <div>
        {peopleData.map((person, index) => (
          <PeopleKakao 
            key={index}
            matchId={person.matchId}
            name={person.name}
            profileIcon={person.profileIcon}
            memberId={person.memberId}
            kakaoId={person.kakaoId}
            universityName={person.universityName}
            major={person.major}
            grade={person.grade}
            classOf={person.classOf}
            age={person.age}
            brief={person.brief}
            keywords={person.keywords}
          />
        ))}
      </div>
      
      <PeopleKakao 
        kakaoId={"string"}
        matchId={0}
        matchRequestId={0}
        name={"박지훈"}
        profileIcon={"ICON_1"}
        universityName={"충남대학교"}
        major={"전자공학과"}
        grade={2}
        classOf={23}
        age={24}
        brief={"성실한 청년"}
        keywords={["진로"]}
      />
      
      <BottomNav />
    </div>
  );
}

export default MatchingMain;