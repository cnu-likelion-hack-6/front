import React from 'react';
import '../styles/MultiButton.css';

function MultiButton({ onClick, isSelected, children }) {
  return (
    <button
      className={`MultiButton ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MultiButton;
