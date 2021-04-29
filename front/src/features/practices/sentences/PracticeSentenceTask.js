import React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import Sentence from './Sentence';
import useSound from 'use-sound';
import keySoundAsset from '../../../mechanicalKeyboard.mp3';
import { KoreanInputMethod, inko} from '../../../helpers/KoreanInputMethod';

function PracticeSentenceTask () {
  const tempData = ['숭실대학교 컴퓨터학부가 생겨났다.',
    '모든게 여전한 나라에서, 다른 느낌을 받는다.', '아이즈원의 노래는 잘 맞추는 사람이 있다.', 
    '여러 곳을 들려 선물을 준비한 보람이 있다.', '토파즈 보석을 캤던 곳에서 다이아몬드를 주울 확률은 얼마나 될지 모르겠다'];
  const finishedInput =' ';
  const finishedResult='';

  const [language] = useState("korean");
  // const [currentKey, setCurrentKey] = useState("");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  var step = useRef(0);
  const [currentResult, setCurrentResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  // console.log(step.current);

  const [playKeyPress] = useSound(
    keySoundAsset,
    { volume: 0.25, interrupt: true, },
  )

  const onKeyDown = useCallback((event) => {
    if (event.code === "Enter") step.current = step.current + 1; // 왜 2배로 증가하는지 모르겠음.
    playKeyPress();
   
    if (language === 'korean') {
      setKoreanBuffer((buf) => {
        const { nextUserInput, nextBuf } = KoreanInputMethod(buf, event, userInput);
        if (nextUserInput !== userInput) {
          // console.log(step.current);
          if (event.code === "Enter") {
            setCurrentResult(tempData[step.current]);
            setUserInput("");
            // setCurrentInput("");
          } else {
            setUserInput(nextUserInput);
          }
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

      if (event.key === 'Enter') {
        return body.concat('\n');
      }

      if (event.key.length > 1)
        return body;

      return body.concat(event.key);
    });
  }, [playKeyPress, language, userInput])

  const onKeyUp = useCallback(() => {
    // setCurrentKey("");
  }, [])

  useEffect(() => {
    setCurrentResult(tempData[step.current]);
  }, [])

  useEffect(() => {
    setCurrentResult(tempData[step.current]);
    setCurrentInput(userInput+inko.en2ko(koreanBuffer));
  });

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

  const sentences = tempData.map((item, index) =>
    <Sentence sentence={item} key = {index}/>);

  return (
    <div className="sentence-task">
      <Sentence type = 'finished-result' sentence = {finishedResult}/>
      <Sentence type = 'finished-input' sentence = {finishedInput}/>
      <Sentence type = 'current-result' sentence = {currentResult} input = {currentInput}/>
      <Sentence type = 'current-input' sentence = {currentInput}/>
      {sentences}
    </div>
  );
}

export default PracticeSentenceTask;