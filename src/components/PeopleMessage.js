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
    fetch(`http://54.80.162.117:8080/matches/${matchId}/thanks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: thankMessage })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
      handleSendMessage(); // 성공적으로 메시지를 보냈을 때 처리
      setThankMessage(""); // 입력 필드 초기화
      alert("감사 메시지가 성공적으로 전송되었습니다!");
    })
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