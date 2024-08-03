import React from 'react';
import '../styles/SendButton.css';

function SendButton({ onClick, isActive, isNextButton, children }) {
  let buttonClass = 'SendButton';

  if (isNextButton) {
    buttonClass += ' next';
  } else if (isActive) {
    buttonClass += ' active';
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SendButton;