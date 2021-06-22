import React from 'react';
import PropTypes from 'prop-types';

Title.propTypes = {
  title: PropTypes.string,
};

function Title({title}) {
  return (
    <div style = {TitleStyle}>
      {title}
    </div>
  )
}

const TitleStyle = {
  width: '94%',
  color: '#828282',
  fontWeight: '400',
  fontSize: '27.5px',
  padding: '20px',
  paddingLeft: '100px',
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
}

export default Title;