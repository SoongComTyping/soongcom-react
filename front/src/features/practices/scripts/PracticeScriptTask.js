import React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import Sentence from "../sentences/Sentence";
import useSound from "use-sound";
import keySoundAsset from "../../../mechanicalKeyboard.mp3";
import { KoreanInputMethod, inko } from "../../../helpers/KoreanInputMethod";
import { useDispatch } from "react-redux";
import { incrementProgressPercent, incrementTypeCount } from "./scriptSlice";

function PracticeScriptTask() {
  const dispatch = useDispatch();
  const [playKeyPress] = useSound(keySoundAsset, {
    volume: 0.25,
    interrupt: true,
  });
  const step = useRef(0);
  const tempData = [
    "Test this sentence",
    "숭실대학교 컴퓨터학부가 생겨났다.",
    "모든게 여전한 나라에서, 다른 느낌을 받는다.",
    "아이즈원의 노래는 잘 맞추는 사람이 있다.",
    "여러 곳을 들려 선물을 준비한 보람이 있다.",
    "토파즈 보석을 캤던 곳에서 다이아몬드를 주울 확률은 얼마나 될지 모르겠다.",
    "숭실대학교 컴퓨터학부가 생겨났다.",
    "다음 문장은 무엇일까?",
  ];
  const [language, setLanguage] = useState("korean");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  const [finishedResult, setFinishedResult] = useState("");
  const [finishedInput, setFinishedInput] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");

  const onKeyDown = useCallback(
    (event) => {
      if (event.code === "CapsLock") {
        setCurrentInput("");
        setKoreanBuffer("");
        setLanguage(language === "korean" ? "english" : "korean") 
      }
      if (event.code === "Space") event.preventDefault();

      var flag = false;
      playKeyPress();
      dispatch(incrementTypeCount());

      if (event.code === "Enter" || userInput.length >= tempData[step.current].length) {

        if (userInput.length < tempData[step.current].length) return;
        setFinishedResult(tempData[step.current]);
        setFinishedInput(userInput);
        setUserInput("");
        setKoreanBuffer("");
        setCurrentInput("");
        setCurrentResult(tempData[step.current + 1]);
        dispatch(
          incrementProgressPercent(((step.current + 1) / tempData.length) * 100)
        );
        flag = true;
        step.current = step.current + 1;
        return ;
      }

      if (language === "korean") {
        setKoreanBuffer((buf) => {
          const { nextUserInput, nextBuf } = KoreanInputMethod(
            buf,
            event,
            userInput
          );
          if (nextUserInput !== userInput) {
            if (!flag) setUserInput(nextUserInput);
          }
          return nextBuf;
        });
        return;
      }
      //   영어 입력 처리 임시 비활
      setUserInput((body) => {
        if (event.key === "Backspace") {
          event.preventDefault(); // for firefox browser
          return body.slice(0, -1);
        }

        if (event.key === "Enter") {
          return body.concat("\n");
        }

        if (event.key.length > 1) return body;

        return body.concat(event.key);
      });
    },
    [playKeyPress, language, userInput]
  );

  useEffect(() => {
    setCurrentResult(tempData[step.current]);
  }, []);

  useEffect(() => {
    setCurrentResult(tempData[step.current]);
    setCurrentInput(userInput + inko.en2ko(koreanBuffer));
  });

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  const sentences = tempData
    .slice(step.current + 1, step.current + 5)
    .map((item, index) => <Sentence sentence={item} key={index} />);

  return (
    <div className="sentence-task">
      <Sentence
        type="finished-result"
        sentence={finishedResult}
        input={finishedInput}
      />
      <Sentence type="finished-input" sentence={finishedInput} />
      <Sentence
        type="current-result"
        sentence={currentResult}
        input={currentInput}
      />
      <Sentence type="current-input" sentence={currentInput} />
      {sentences}
    </div>
  );
}

export default PracticeScriptTask;
