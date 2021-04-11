import React from 'react';
import PropTypes from 'prop-types';

Sentence.defaultProps = {
  type: 'sentence',
  sentence: ' ',
};

function Sentence ({type, sentence}) {
  return (
    <div className={type}>
      {sentence}
    </div>
  );
}

Sentence.propTypes = {
  type : PropTypes.string,
  sentence: PropTypes.string,

}

export default Sentence;