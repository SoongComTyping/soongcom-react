import React from 'react';
import { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import Avatar from '../assets/codong.png';
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
          <b>숭컴타자연습</b>
        </Link>
        <div style={MenuStyle}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseHover} >
          <div style={MenuItemStyle}>대결하기</div>
          <div style={MenuItemStyle}>연습하기</div>
          <div style={MenuItemStyle}>스크립트</div>
          <div style={MenuItemStyle}>내 정보</div>
        </div>
        <div style={AvatarStyle}>
          <img width='40px' height='40px' src={Avatar} />
        </div>
      </div>
      {(isHovering || isChoosing) && <DetailMenu onChoose={handleMouseChoose}/>}
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
  fontFamily: 'Helvetica Neue',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'space-around',
  display: 'flex',
}

const TitleStyle = {
  position: 'absolute',
  color: 'white',
  fontSize: '2rem',
  left: '80px',
  textDecoration: 'none',
}

const MenuStyle = {
  width: '40%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const MenuItemStyle = {
  flex: 1,
  color: 'white',
  fontWeight: '700',
  fontSize: '20px',
  textAlign: 'center',
}

const AvatarStyle = {
  position: 'absolute',
  right: '60px',
}

export default Header;