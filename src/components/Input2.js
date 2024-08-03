import React from "react";
import "../styles/Input2.css";

function Input2({ title, value, onChange, type = "text" }) {
  return (
    <div className="input">
      <div className="input_wrapper">
        <p className="input_title">{ title }</p>
        
        <input 
          className="input2_container"
          type={ type }
          value={ value }
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input2;