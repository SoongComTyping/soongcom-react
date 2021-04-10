import React from 'react';

function Header() {

  return (
    <section style={HeaderStyle}>
      <h2 style={{flex: 20}}>
        낱말 연습
      </h2>
      <div style={{flex: 50, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <div style={{flex: 1}}>1</div>
        <div style={{flex: 1}}>2</div>
        <div style={{flex: 1}}>3</div>
        <div style={{flex: 1}}>4</div>
        <div style={{flex: 1}}>5</div>
        <div style={{flex: 1}}>6</div>
        <div style={{flex: 1}}>7</div>
      </div>
      <div style={{flex: 20, display: 'flex', alignItems: 'center'}}>
        <button className="button">한</button>
        <button className="button">영</button>
      </div>
    </section>
  )
}

const HeaderStyle = {
  width: '100%',
  background: '#FFFFFF',
  height: '80px',
  fontSize: '16px',
  fontWeight: '350',
  fontFamily: 'Noto Serif KR',
  borderBottom: '2px solid #eeeeee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  color: '#828282',
};

function WordsPractice() {

  return (
    <>
      <Header></Header>
    </>
  )
}

export default WordsPractice;
