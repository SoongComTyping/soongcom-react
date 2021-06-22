import React from "react";
import "../sass/main.css";
import { useLocation } from 'react-router-dom';

function PracticeResult() {
  const location = useLocation();
  //   console.log(location.state);
  return <div>최종 타수 : {location.state.typeSpeed}</div>;
}

export default PracticeResult;
