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
              script.body.split('').map((char, j) => {
                const isCorrect = char === script.userInput[j];
                let className = isCorrect ? "correct" : "wrong";
                if (script.userInput.length === j)
                  className = 'cursor';
                else if (script.userInput.length < j)
                  className = 'next';
                else if (isCorrect === false) char = script.userInput[j];
                return (
                  <span className={className} key={`${char} ${j}`}>{char}</span>
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
