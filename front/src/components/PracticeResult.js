import React from "react";
import "../sass/main.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


function PracticeResult() {
  const location = useLocation();
  return (
    <div className="content">
      <div className="result-box">
        <span id = "result-text"><b>김데브</b>님의 최종 타수</span>
        <span id = "type-speed">{location.state.typeSpeed}</span>
        
        {location.state.scriptList != undefined &&
        <div className="result-box2">
          <span id = "result-text">
            <b>김데브</b>님의 오타를 분석하여 
            추천하는 스크립트 목록입니다 !!
          </span>
          <ul className="recommend-list">
            {location.state.scriptList.map((item, idx) => {
              return (
                <Link id="script-link" to={`practice-script/id=${item.id}`} key={idx}>
                  <li id="recommend-item" key={idx}>{idx+1}. {item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        }
      </div>
    </div>
  );
}

export default PracticeResult;
