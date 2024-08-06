import React, { useState } from "react";

import SendButton from "./SendButton";
import '../styles/PeopleLike.css';
import send from "../images/send.png";

function PeopleMessage({ matchId, thankMessage, setThankMessage, handleSendMessage }) {
  const handleSendMessageClick = () => {
    if (!matchId) {
      alert("매칭 ID 가 유효하지 않습니다.");
      return;
    }

    const token = localStorage.getItem('accessToken');
    fetch(`http://54.224.216.192:8080/matches/${matchId}/thanks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: thankMessage })
    })
    .then(response => alert("감사 인사를 보냈습니다."))
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };
  
  return (
    <div className="people_message">
      <div className="message_thank">
        <p>밥약 후 상대에게 감사 인사를 보내보세요!</p>
      </div>
      <div className="input_message">
        <input
          className="thankMessage"
          type="text"
          value={thankMessage}
          onChange={(e) => setThankMessage(e.target.value)}
        />
        <SendButton 
          className="thank_message_button"
          onClick={handleSendMessageClick} 
          handleSendMessage={handleSendMessage}
          isActive={true}>
          <img src={send} />
        </SendButton>
      </div>
    </div>
  );
}

export default PeopleMessage;