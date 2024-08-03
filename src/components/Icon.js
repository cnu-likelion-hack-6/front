import React from "react";
import '../styles/Icon.css';

const Icon = ({ isSelected, onClick, imagePath }) => {
  return (
    <button
      className={`Icon ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img src={imagePath} alt="icon" className="icon_img"/>
    </button>
  );
};

export default Icon;
