import './App.css';
import React from 'react'
import { useCallback, useEffect, useState, useRef } from 'react';
import useSound from 'use-sound';
import keySoundAsset from './mechanicalKeyboard.mp3';
import MacKeyboard from './MacKeyboard';
import { KeyboardContext, ScriptContext } from './Contexts';
import TypingScript from './TypingScript';
import { KoreanInputMethod } from './KoreanHelper';
import { PepeAnime } from './Animation'
import TypingSpeedGraph from './TypingSpeedGraph';

function App() {
  const [currentKey, setCurrentKey] = useState("");
  const [language] = useState("korean");
  const [displayMode] = useState("dark");
  const [body] = useState("모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 대통령의 임기는 5년으로 하며, 중임할 수 없다. 선거와 국민투표의 공정한 관리 및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다.");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  const [typeCount, setTypeCount] = useState(0);
  const [typeSpeed, setTypeSpeed] = useState(0);
  const [tick, setTick] = useState(0);

  const [playKeyPress] = useSound(
    keySoundAsset,
    { volume: 0.25, interrupt: true, },
  )

  const onKeyDown = useCallback((event) => {
    setCurrentKey(event.code);
    setTypeCount((typeCount) => typeCount + 1);
    console.log(typeCount);
    playKeyPress();
    if (language === 'korean') {
      setKoreanBuffer((buf) => {
        const { nextUserInput, nextBuf } = KoreanInputMethod(buf, event, userInput);
        if (nextUserInput !== userInput) {
          setUserInput(nextUserInput);
        }
        return nextBuf;
      });
      return;
    }

    setUserInput((body) => {
      if (event.key === 'Backspace') {
        event.preventDefault(); // for firefox browser
        return body.slice(0, -1);
      }

      if (event.key === 'Enter')
        return body.concat('\n');

      if (event.key.length > 1)
        return body;

      return body.concat(event.key);
    });
  }, [playKeyPress, language, userInput])

  const onKeyUp = useCallback(() => {
    setCurrentKey("");
  }, [])

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    }
  }, [onKeyDown])

  useEffect(() => {
    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.addEventListener("keyup", onKeyUp);
    }
  }, [onKeyUp])

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    setTypeSpeed(parseInt(typeCount / tick * 60));
    setTick(tick+0.01);
    console.log(tick);
  }, 10);

  return (
    <div className="App">
      <TypingSpeedGraph num={typeSpeed} />
      <ScriptContext.Provider value={{ body, userInput, language, koreanBuffer, displayMode }}>
        <TypingScript style={TypingScriptStyle} />
      </ScriptContext.Provider>
      <KeyboardContext.Provider value={{ currentKey, language }} >
        <MacKeyboard style={MacKeyboardStyle} />
      </KeyboardContext.Provider>
      <KeyboardContext.Provider value={{ typeCount }} >
        <PepeAnime />
      </KeyboardContext.Provider>
    </div>
  );
}

const TypingScriptStyle = {
  position: 'absolute',
  left: '4em',
  top: '8em',
  width: '40em',
  overflow: 'hidden',
  height: '20rem',
  letterSpacing: '1.1px',
  fontSize: '25px',
  fontWeight: '400',
  fontFamily: 'Noto Serif KR',
  textAlign: 'left',
}

const MacKeyboardStyle = {
  position: 'absolute',
  left: '13em',
  top: '24em',
  display: 'block',
  width: '50em',
  height: '18em',
};

export default App;
