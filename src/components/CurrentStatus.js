import React from "react";
import warning from '../images/warning.png';

import '../styles/CurrentStatus.css';

function CurrentStatus({ status }) {

  return(
    <div className="status">

      <div className="status_title_container">
        <img className="status_title_image" src={warning} />
        <p className="status_title">현재 상태 표시</p>
      </div>

      <div className="status_select_container">

        <button 
          className={`status_select ${status === 'BUYER' ? 'active' : ''}`}
        >
          <div className="status_circle red"></div>
          <p className="status_select_text">사줄래요</p>
        </button>

        <button 
          className={`status_select ${status === 'TAKER' ? 'active' : ''}`}
        >
          <div className="status_circle blue"></div>
          <p className="status_select_text">사주세요</p>
        </button>

        <button 
          className={`status_select ${status === 'BOTH' ? 'active' : ''}`}
        >
          <div className="status_circle green"></div>
          <p className="status_select_text">둘 다 좋아요</p>
        </button>
      </div>

    </div>
  );
}

export default CurrentStatus;