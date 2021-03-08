import React from 'react';
import PropTypes from 'prop-types';

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

Key.propTypes = {
  value: PropTypes.string,
  customStyle: PropTypes.object,
};

export default React.memo(Key);
