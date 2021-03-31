import React from 'react';
import { useState, useCallback } from 'react';
import Img from '../assets/codong.png';


function Header() {
  const [isHovering, setIsHovering] = useState("");

  const handleMouseHover = useCallback(() => {
    setIsHovering((isHovering) => !isHovering);
  }, [])

  return (
    <div>
      <div style={HeaderStyle}>
        <div style={TitleStyle}>
          <b>숭컴타</b>
        </div>
        <div style={MenuStyle}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseHover} >
          <div style={MenuItemStyle}>대결하기</div>
          <div style={MenuItemStyle}>연습하기</div>
          <div style={MenuItemStyle}>스크립트</div>
          <div style={MenuItemStyle}>내 정보</div>
        </div>
        <div>
          <img width='40px' height='40px' src={Img} />
        </div>
      </div>
      {isHovering && <div id="detail" style={DetailMenuStyle}>
      </div> }
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
  display: 'flex',
}

const TitleStyle = {
  marginLeft: '5%',
  marginRight: '20%',
  color: 'white',
  fontSize: '40px'
}

const MenuStyle = {
  width: '40%',
  display: 'flex',
  alignItems: 'center',
}

const MenuItemStyle = {
  color: 'white',
  marginRight: '8%',
  fontWeight: '700',
  fontSize: '20px',
}

const DetailMenuStyle = {
  width: '100%',
  background: '#FFFFFF',
  height: '175px',
  fontSize: '25px',
  fontWeight: '400',
  fontFamily: 'Noto Serif KR',
  textAlign: 'left',
}
export default Header;