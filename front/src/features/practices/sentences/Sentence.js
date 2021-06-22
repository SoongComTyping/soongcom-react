import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { incrementWrongCharacters, incrementCurrentCharacters } from './sentenceSlice';
import Cursor from '../../../assets/cursor.gif';
import { addWrongTyping } from '../scripts/scriptSlice';

Sentence.defaultProps = {
  type: 'sentence',
  sentence: ' ',
};

function Sentence ({type, sentence, input}) {
  var currentSentence, wrongCount = 0, wrongTyping;
  const dispatch = useDispatch();

  if (type == "current-result" || type == "finished-result") {
    currentSentence = sentence.split("").map((item, index) => {
      var answerStyle;
      if (input.length < index) {
        answerStyle = "default";
      } else if (input.length - 1 > index) {
        answerStyle = "done";
        if (input[index] != sentence[index]) {
          answerStyle = "different";
          wrongCount++;
          wrongTyping = sentence[index];
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
      const regExp = /^[a-zA-Z]*$/;
      dispatch(incrementWrongCharacters(wrongCount));
      dispatch(incrementCurrentCharacters(input.length));
      if(wrongTyping && regExp.test(wrongTyping)) 
        dispatch(addWrongTyping(wrongTyping));
    }
  });

  return (
    <div className={type}>
      {currentSentence}
      {type == "current-input" &&
       <img id = 'cursor' src = {Cursor}/>}
    </div>
  );
}

Sentence.propTypes = {
  type : PropTypes.string,
  sentence: PropTypes.string,
  input: PropTypes.string,
}

export default React.memo(Sentence);