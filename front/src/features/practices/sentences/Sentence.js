import React from 'react';
import PropTypes from 'prop-types';

Sentence.defaultProps = {
  type: 'sentence',
  sentence: ' ',
};

function Sentence ({type, sentence, input}) {
  var currentSentence;

  if (type == "current-result" || type == "finished-result") {
    currentSentence = sentence.split("").map((item, index) => {
      var answerStyle;
      if (input.length <= index) {
        answerStyle = "default";
      } else if (input.length - 1 > index) {
        answerStyle = "done";
        if (input[index] != sentence[index]) {
          answerStyle = "different";
        }
      }
      return (
        <span key={index} className={answerStyle}>
          {item}
        </span>
      );
    });
  } else {
    currentSentence = sentence;
  }

  return (
    <div className={type}>
      {currentSentence}
    </div>
  );
}

Sentence.propTypes = {
  type : PropTypes.string,
  sentence: PropTypes.string,
  input: PropTypes.string,
}

export default Sentence;