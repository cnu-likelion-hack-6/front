import React from "react";
import "../styles/Input.css";

function Input({ title, value, onChange, type = "text" }) {
  return (
    <div className="input">
      <div className="input_wrapper">
        <p className="input_title">{ title }</p>

        <input 
          type={ type }
          className="input_container"
          value={ value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;