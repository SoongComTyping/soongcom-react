import React from 'react';
import { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import Img from '../assets/codong.png';
import DetailMenu from './DetailMenu';


function Header() {
  const [isHovering, setIsHovering] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);

  const handleMouseHover = useCallback(() => {
    setIsHovering((isHovering) => !isHovering);
  }, [])

  const handleMouseChoose = useCallback(() => {
    setIsChoosing((isChoosing) => !isChoosing);
  }, [])

  return (
    <div>
      <div style={HeaderStyle}>
        <Link to ='/' style={TitleStyle}>
          <b>숭컴타</b>
        </Link>
        <div style={MenuStyle}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseHover} >
          <div style={MenuItemStyle}>대결하기</div>
          <div style={MenuItemStyle}>연습하기</div>
          <div style={MenuItemStyle}>스크립트</div>
          <div style={MenuItemStyle}>내 정보</div>
        </div>
        <div style={{marginRight: '60px',}}>
          <img width='40px' height='40px' src={Img} />
        </div>
      </div>
      {(isHovering || isChoosing) && 
      <DetailMenu onChoose = {handleMouseChoose}/>}
    </div>
  )
}

const HeaderStyle = {
  width: '100%',
  overflow: 'hidden',
  background: '#7BC5C5',
  height: '100px',
  fontSize: '25px',
  fontWeight: '400',
  fontFamily: 'Noto Serif KR',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'space-around',
  display: 'flex',
}

const TitleStyle = {
  color: 'white',
  fontSize: '40px',
  marginLeft: '80px',
  textDecoration: 'none',
}

const MenuStyle = {
  width: '40%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginRight: '65px',
}

const MenuItemStyle = {
  width: '100px',
  color: 'white',
  fontWeight: '700',
  fontSize: '20px',
  margin: '30px',
}

export default Header;