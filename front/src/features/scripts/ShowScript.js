import axios from 'axios';
import React from 'react';
import Title from '../../components/Title';
import {useEffect} from "react"
import '../../sass/main.css';

function ShowScript() {
  var tempData = [];

  async function getList() {
    axios({
      method: 'get',
      url: 'http://soongcom.kro.kr:3001/practice/list'
    })
      .then(function(response){
        for(let i = 0 ; i < response.data.list.length ; i++){
          tempData[tempData.length] = response.data.list[i].name;
        }
      });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Title title = '스크립트 연습'/>
      <form className="ListForm">
        <div className="TabSetting">
          <div className="NavyTab">
            <button className="NavyButton" type="button">탐색</button>
            <div className="Line"></div>
            <button className="NavyButton" type="button">인기</button>
          </div>
          <input className="SearchTab"
            type="text" 
            placeholder="스크립트를 찾아보세요!">
          </input>
        </div>
        <div className="ListBody">
          <ul>
            
          </ul>
        </div>
      </form>
    </div>
  );
}

export default ShowScript;