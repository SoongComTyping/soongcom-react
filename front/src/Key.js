
import React from 'react';

function Key({ value, customStyle }) {
  return (
    <div className="keyboard" style={{ ...KeyStyle, ...customStyle }}>
      <div>{value}</div>
    </div>
  )
}

const KeyStyle = {
  padding: '10px',
  paddingTop: '10px',
  color: 'white',
  margin: '4px',
  fontSize: '1.5rem',
  boxShadow: '0 1px 2px 0 #12CFC0, 0 1px 3px 1px #bdeaff'
};

export default React.memo(Key);
