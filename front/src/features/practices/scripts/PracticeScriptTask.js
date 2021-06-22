import React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import Sentence from "../sentences/Sentence";
import useSound from "use-sound";
import keySoundAsset from "../../../mechanicalKeyboard.mp3";
import { KoreanInputMethod, inko } from "../../../helpers/KoreanInputMethod";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementProgressPercent,
  incrementTypeCount,
  selectWrongTyping,
  selectTypeSpeed,
  updateTitle,
} from "./scriptSlice";
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'

function PracticeScriptTask() {
  const dispatch = useDispatch();
  const [playKeyPress] = useSound(keySoundAsset, {
    volume: 0.25,
    interrupt: true,
  });
  const step = useRef(0);
  const history = useHistory();
  const [script, setScript] = useState([]);
  const [language, setLanguage] = useState("english");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  const [finishedResult, setFinishedResult] = useState("");
  const [finishedInput, setFinishedInput] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [inProgress, setInProgress] = useState(true);
  const wrongTyping = useSelector(selectWrongTyping);
  const typeSpeed = useSelector(selectTypeSpeed);
  const location = useLocation();

  const onKeyDown = useCallback(
    (event) => {
      if (inProgress) return;
      var flag = false;
      playKeyPress();
      console.log(event.code)
      if (event.code === "Space") event.preventDefault();
      if (event.code === "CapsLock" || event.code === "AltRight") {
        if (language === "korean") setKoreanBuffer("");
        setLanguage(language === "korean" ? "english" : "korean");
        return;
      }
      dispatch(incrementTypeCount());

      if (event.code === "Enter" || userInput.length >= script[step.current].length) {
        if (userInput.length < script[step.current].length) return;
        setFinishedResult(script[step.current]);
        setFinishedInput(userInput);
        setUserInput("");
        setKoreanBuffer("");
        setCurrentInput("");
        setCurrentResult(script[step.current + 1]);
        dispatch(
          incrementProgressPercent(((step.current + 1) / script.length) * 100)
        );
        flag = true;
        step.current = step.current + 1;
        return;
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
    [playKeyPress, language, userInput, inProgress, script]
  );

  useEffect(() => {
    setCurrentResult(script[step.current]);
    const id = Number(location.pathname.split("=")[1]);
    setInProgress(true);
    axios({
      method: 'get',
      url: `http://soongcom.kro.kr:3001/practice/script?id=${id}`
    })
      .then(function(response){
        const {content, name} = response.data.script;
        var sentences = [];
        
        if (content.indexOf("\n") < 0) {
          for (var startIndex = 0;startIndex < content.length;startIndex += 80)
            sentences.push(content.substr(startIndex, 80));
        } else {
          sentences = content.split("\n");
          for(var idx = 0; idx < sentences.length; idx++) 
            if(sentences[idx].length == 0)
              sentences.splice(idx, 1);
        }

        
        setInProgress(false);
        setScript(sentences);
        dispatch(updateTitle(name));        
      });
  }, []);

  useEffect(() => {
    if(inProgress) return;
    if (script.length > 0 && script.length <= step.current) {
      if (Object.keys(wrongTyping).length != 0) {
        axios
          .post("http://soongcom.kro.kr:3001/practice/script/complete", {
            wrongTyping: wrongTyping,
          })
          .then(function (response) {
            const { list } = response.data;
            history.push({
              pathname: "/practice-result",
              state: { typeSpeed: typeSpeed, scriptList: list },
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        history.push({
          pathname: "/practice-result",
          state: { typeSpeed: typeSpeed },
        });
      }
      setInProgress(true);
      return;
    }
    setCurrentResult(script[step.current]);
    setCurrentInput(userInput + inko.en2ko(koreanBuffer));
  });

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  const sentences = script
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