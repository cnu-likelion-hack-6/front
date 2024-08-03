import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import Message from "../components/Message";

import rice from '../images/rice.png';
import '../styles/AcceptMain.css';


function MessageMain() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('http://54.80.162.117:8080/matches/thanks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setMessages(data);
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
  }, []);

  return(
    <div className="acceptMain">
      <Logo />

      <div className="accept_count">
        <img src={rice} className="rice_image"/>
        받은 감사 인사
      </div>

      <div className="messageMain_container">
        {messages.map((message, index) => (
        <Message
          key={index}
          profileIcon={message.profileIcon}
          name={message.name}
          universityName={message.universityName}
          major={message.major}
          grade={message.grade}
          classOf={message.classOf}
          message={message.message}
        />
        ))}
      </div>
        
      <Message
          key={0}
          profileIcon={"ICON_1"}
          name={"박지훈"}
          universityName={"충남대학교"}
          major={"컴퓨터융합학부"}
          grade={2}
          classOf={23}
          message={"고마워~!"}
        />
        
      <BottomNav />
    </div>
  );
}

export default MessageMain;