import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { incrementWrongCharacters, incrementCurrentCharacters } from './sentenceSlice';

Sentence.defaultProps = {
  type: 'sentence',
  sentence: ' ',
};

function Sentence ({type, sentence, input}) {
  var currentSentence, wrongCount = 0;
  const dispatch = useDispatch();

  if (type == "current-result" || type == "finished-result") {
    if(type == "current-result") {
      console.log(input);
    }
    currentSentence = sentence.split("").map((item, index) => {
      var answerStyle;
      if (input.length < index) {
        answerStyle = "default";
      } else if (input.length - 1 > index) {
        answerStyle = "done";
        if (input[index] != sentence[index]) {
          answerStyle = "different";
          wrongCount++;
        }
      } else {
        if (input[index] != sentence[index]) {
          answerStyle = "default";
        } else {
          answerStyle = "done";
        }
      }
      
      return (
        <span key={index} className={answerStyle}>
          {item}
        </span>
      );
    });
  } else {
    currentSentence = sentence.split("").map((item, index) => {
      if (item != " ") {
        return <span key={index}>{item}</span>;
      } else {
        return <span key={index}>&nbsp;</span>;
      }
    });
  }

  useEffect(() => {
    if (type == "current-result") {
      dispatch(incrementWrongCharacters(wrongCount));
      dispatch(incrementCurrentCharacters(input.length));
    }
  });
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

export default React.memo(Sentence);