import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import Message from "../components/Message";

import rice from '../images/rice.png';
import '../styles/AcceptMain.css';


function MessageMain() {
  const [messages, setMessages] = useState([]);

  // GET : 받은 감사 인사 조회
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('/api/matches/thanks', {
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


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const token = localStorage.getItem('accessToken');
  //   fetch('/api/matches/thanks', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     setMessages(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching messages:', error);
  //   });
  //   }, 1000);
  //
  //   return () => clearInterval(interval);
  // }, []);


  return(
    <div className="acceptMain">
      <Logo />

      <div className="accept_count">
        <img src={rice} className="rice_image"/>
        받은 감사 인사
      </div>

      <div className="messageMain_container">
        {messages && messages?.map((message, index) => (
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
        
      <BottomNav />
    </div>
  );
}

export default MessageMain;