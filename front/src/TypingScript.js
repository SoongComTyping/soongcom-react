import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScriptContext } from './Contexts';
import { inko } from './KoreanHelper';

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
                    if (bodyIndex > script.userInput.length - 5) {
                      char = script.userInput[bodyIndex];
                      if (char === ' ' && script.language === 'korean') char = '   ';
                    }
                  }
                }
                else if (script.userInput.length === bodyIndex) {
                  className = 'cursor';
                  if (script.language === 'korean') {
                    if (script.koreanBuffer.length !== 0)
                      char = inko.en2ko(script.koreanBuffer);
                  }
                }
                else if (script.userInput.length < bodyIndex)
                  className = 'next';
                return (
                  <span className={`dark ${className}`} key={`${char} ${bodyIndex}`}>{char}</span>
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
