import React from "react";
import "../styles/People.css";

const keywordMap = {
  "CAREERS": "진로",
  "EMPLOYMENT": "취업",
  "ACADEMICS": "학업",
  "RELATIONSHIPS": "연애",
  "FRIENDS": "친구",
  "ETC": "기타"
};

function Keyword( { value } ) {
  return(
    <div className="keyword">
      <p># {keywordMap[value] || value}</p>
    </div>
  );
}

export default Keyword;