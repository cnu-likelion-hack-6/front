import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import RequestPeople from "../components/People";
import CurrentStatus from "../components/CurrentStatus";

import "../styles/RequestMain.css";
import "../styles/Main.css";
import Icon from "../components/Icon";

function RequestMain() {
  const [ candidates, setCandidates ] = useState([]);
  const selectedOption = localStorage.getItem('selectedOption') || '';

  useEffect(() => {
    fetch('http://54.80.162.117:8080/matches/candidates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched candidates: ", data);
      console.log("candidate : ", candidates);
      setCandidates(data);
    })
    .catch(error => {
      console.error('Error fetching candidates:', error);
    });
  }, []);

  return(
    <div className="requestMain">
      <Logo />

      <CurrentStatus status={selectedOption} />

      <div>
        {candidates.map((candidate) => (
          <RequestPeople
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
      <div>
        <RequestPeople
          memberId={0}
          profileIcon={"ICON_1"}
          name={"박지훈"}
          universityName={"충남대학교"}
          major={"전자공학과"}
          grade={2}
          classOf={23}
          age={24}
          brief={"성실한 청년"}
          keywords={["진로"]}
        />
      </div>

      <BottomNav />
    </div>
  );
}

export default RequestMain;