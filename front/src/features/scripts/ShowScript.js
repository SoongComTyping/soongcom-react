import axios from 'axios';
import React, { useState }  from 'react';
import Title from '../../components/Title';
import {useEffect} from "react"
import { Link } from "react-router-dom";
import '../../sass/main.css';

function ShowScript() {
  const [practices, setPractices] = useState([]);

  async function getList() {
    axios({
      method: 'get',
      url: 'http://soongcom.kro.kr:3001/practice/list'
    })
      .then(function(response){
        setPractices(response.data.list);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="content">
      <Title title="스크립트 연습" />
      <form className="ListForm">
        <div className="TabSetting">
          <div className="NavyTab">
            <button className="NavyButton" type="button">
              탐색
            </button>
            <div className="Line"></div>
            <button className="NavyButton" type="button">
              인기
            </button>
          </div>
          <input
            className="SearchTab"
            type="text"
            placeholder="스크립트를 찾아보세요!"
          ></input>
        </div>
        <div className="ListBody">
          <ul className="ScriptList">
            {practices.map((practice, idx) => (
              <Link
                className="ScriptListItem"
                to={`/practice-script/id=${practice.id}`}
                key={`PRACTICE_LI_${idx}_${practice.date}`}
              >
                {practice.name}
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default ShowScript;