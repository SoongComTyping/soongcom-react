import React from 'react';
import PropTypes from 'prop-types';

function TypingSpeedGraph({num}) {
  return (
    <div>
      {num}
    </div>
  )
}

TypingSpeedGraph.propTypes = {
  num: PropTypes.object,
};

export default TypingSpeedGraph;