import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScriptContext } from './Contexts';

function TypingScript({ style }) {
  const script = useContext(ScriptContext);


  return (
    <div className="typingTextArea noselect" style={style}>
      <ul style={{ listStyleType: 'none', overflow: 'hidden', }}>
        {
          <li className="word">
            {
              [...script.body].map((char, bodyIndex) => {
                const isCorrect = char === script.userInput[bodyIndex];
                let className;
                if (bodyIndex < script.userInput.length) {
                  className = isCorrect ? "correct" : "wrong";
                  if (isCorrect === false) {
                    char = script.userInput[bodyIndex];
                    if (char === ' ') char = '   ';
                  }
                }
                else if (script.userInput.length === bodyIndex)
                  className = 'cursor';
                else if (script.userInput.length < bodyIndex)
                  className = 'next';
                return (
                  <span className={`char ${className}`} key={`${char} ${bodyIndex}`}>{char}</span>
                )
              })
            }
          </li>
        }
      </ul>
    </div>
  )
}

TypingScript.propTypes = {
  style: PropTypes.object,
};

export default TypingScript;
