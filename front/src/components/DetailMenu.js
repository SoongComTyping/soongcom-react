import React from 'react';

function DetailMenu() {
  const CompeteModes = ['방 생성', '방 참여'];
  const CompeteList = CompeteModes.map((mode,index) => <li style={{marginBottom: '12px'}} key = {index}>{mode}</li>);
  const PracticeModes = ['자리연습', '단어연습', '문장연습', '스크립트 연습'];
  const PracticeList = PracticeModes.map((mode,index) => <li style={{marginBottom: '12px'}} key = {index}>{mode}</li>);
  const ScriptAttach = ['스크립트 보기', '스크립트 등록'];
  const ScriptList = ScriptAttach.map((mode,index) => <li style={{marginBottom: '12px'}} key = {index}>{mode}</li>);
  const InformationMenus = ['내 정보', '통계'];
  const InformationList = InformationMenus.map((mode,index) => <li style={{marginBottom: '12px'}} key = {index}>{mode}</li>);

  return (
    <div style={DetailMenuStyle}>
      <div style={MenuWrapperStyle}>
        <ul style = {EachMenuStyle}>{CompeteList}</ul>
        <ul style = {EachMenuStyle}>{PracticeList}</ul>
        <ul style = {EachMenuStyle}>{ScriptList}</ul>
        <ul style = {EachMenuStyle}>{InformationList}</ul>
      </div>
    </div>
  )
}

const DetailMenuStyle = {
  width: '100%',
  background: '#FFFFFF',
  height: '175px',
  fontSize: '17px',
  fontWeight: '350',
  fontFamily: 'Noto Serif KR',
  borderBottom: '2px solid #eeeeee',
  display: 'flex',
  justifyContent: 'center',
  color: '#828282',
}

const MenuWrapperStyle = {
  width : '40%', 
  justifyContent: 'space-around',
  display: 'flex',
  marginTop : '16px',
}

const EachMenuStyle = {
  listStyleType: 'none',
  padding: '0px',
  margin: '0px',
  alignItems: 'top',
  textAlign: 'top',
  marginBottom: '10px',
}

export default DetailMenu;