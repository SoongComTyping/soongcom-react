import React from 'react';
import Title from '../components/Title';
import { Link } from "react-router-dom";
import './AddScript.css';

function AddScript() {
  return (
    <div >
      <Title title = '스크립트 등록'/>
      <form style={BackStyle}>
        <p>
          <input style={HeaderStyle}
            type="text" 
            name="title"
            placeholder="제목을 입력하세요."
          />
        </p>

        <p>
          <textarea 
            className="notes"
            type="text"
            name="content"
            placeholder="내용을 입력하세요. (최대 00자)"
          />
        </p>
        <p>
          <Link to ='/show-script'>
            <button style={ButtonStyle}>등록</button>
          </Link>
        </p>
      </form>
      
    </div>
  );
}

const BackStyle = {
  display: 'inline-block',
  width: '70%',
  borderRight: '2px solid #e0e0e0',
  borderLeft: '1px solid #e0e0e0'
  //border: '5px solid #000000',
}

const HeaderStyle = {
  width: '85%',
  height: '75px',
  fontSize: '25px',
  border: 'none',
  outline: 'none',
  borderBottom: '1px solid #e0e0e0',
}

// const ContentsStyle = {
//   width: '85%',
//   height: '900px',
//   resize: 'none',
//   fontSize: '20px',
//   border: 'none',
//   outline: 'none',
//   borderBottom: '2px solid #e0e0e0'
// }

const ButtonStyle = {
  position: 'relative',
  padding: '10px 40px',
  margin: '0px 10px 10px 0px',
  borderRadius: '30px',
  fontSize: '18px',
  color: '#FFF',
  background: '#EDC5C5',
  outline: 'none',
  textDecoration: 'none',
}

export default AddScript;