import React from 'react';
import '../styles/Button.css';

function Button({ onClick, isActive, isNextButton, isIconSelected, children }) {
  let buttonClass = 'Button';

  if (isNextButton) {
    buttonClass += ' next';
  } else if (isIconSelected) {
    buttonClass += ' active selected';
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

export default Button;
