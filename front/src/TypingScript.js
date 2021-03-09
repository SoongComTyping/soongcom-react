import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScriptContext } from './Contexts';

function TypingScript({ style }) {
  const script = useContext(ScriptContext);


  return (
    <div className="typingTextArea" style={style}>
      <ul style={{ listStyleType: 'none', overflow: 'hidden', }}>
        {
          script.userInput.split('\n').map((word, i) => {
            return (
              <li className="word" key={`${word}${i}`} >
                {
                  word.split('').map((char, j) => {
                    return (
                      <span className="correct" key={`${char} ${j}`}>{char}</span>
                    )
                  })
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

TypingScript.propTypes = {
  style: PropTypes.object,
};

export default TypingScript;
