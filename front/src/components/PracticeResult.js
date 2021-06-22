import React from "react";
import "../sass/main.css";
import { useLocation } from "react-router-dom";

function PracticeResult() {
  const location = useLocation();
  return (
    <div className="ScriptList">
      최종 타수 : {location.state.typeSpeed}
      <ul className="ScriptListItem">
        {location.state.scriptList.map((item, idx) => {
          return <li key={idx}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default PracticeResult;
