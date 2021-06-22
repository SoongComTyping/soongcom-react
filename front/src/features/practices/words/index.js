import React, { useCallback, useEffect } from 'react';
import MacKeyboard from '../../keyboards/MacKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  switchLanguage,
  keyPressed,
  keyClear,
  selectKeyboardsLanguage,
} from '../../keyboards/KeyboardsSlice';
import {
  keyPressed as wordsKeyPressed,
  switchLanguage as wordsSwitchLanguage,
  selectUserInput,
  selectPreviousWords,
  selectPreviousTypedWords,
  selectCursorWord,
  selectNextWords,
  fetchWords,
  selectFetchStatus,
  selectProgressPercent,
  selectWrongCount,
  selectAccuracy,
} from './wordsSlice';
import ProgressBar from "@ramonak/react-progress-bar";
import useSound from 'use-sound';
import keySoundAsset from '../../../mechanicalKeyboard.mp3';
// import style from './index.module.scss';
// import '../../../sass/main.css';

function Header() {
  const dispatch = useDispatch();
  const language = useSelector(selectKeyboardsLanguage);
  const level = useSelector((state) => state.words.level);

  const renderedLevel = [1, 2, 3, 4, 5, 6, 7].map(n => {
    const foccussed = level === n;
    let cName = foccussed ? 'CircleFocussed' : 'Circle';

    return (
      <div key={`${n} ${foccussed}`} className={cName}>{n}</div>
    )
  });

  return (
    <section className='HeaderStyle'>
      <h2 className="HeaderTitle">
        낱말 연습
      </h2>
      <div className="Progress">
        {renderedLevel}
      </div>
      <form className="LanguageSelect">
        <label htmlFor="korean">한</label>
        <input type="checkbox" checked={language==='korean'} readOnly id="korean" onClick={() => {
          dispatch(wordsSwitchLanguage({ language: "korean" }));
          dispatch(switchLanguage({ language: "korean" }));
        }}/>
        <label htmlFor="english">영</label>
        <input type="checkbox" checked={language==='english'} readOnly id="english" onClick={() => {
          dispatch(wordsSwitchLanguage({ language: "english" }));
          dispatch(switchLanguage({ language: "english" }))
        }}/>
      </form>
    </section>
  )
}

function WordsPractice() {
  const dispatch = useDispatch();
  const language = useSelector(selectKeyboardsLanguage);
  const userInput = useSelector(selectUserInput);
  const previousWords = useSelector(selectPreviousWords);
  const typedWords = useSelector(selectPreviousTypedWords);
  const cursorWord = useSelector(selectCursorWord);
  const nextWords = useSelector(selectNextWords);
  const fetchStatus = useSelector(selectFetchStatus);
  const progressPercent = useSelector(selectProgressPercent);
  const wrongCount = useSelector(selectWrongCount);
  const accuracy = useSelector(selectAccuracy);
  const [playTypingSound] = useSound(keySoundAsset, { volume: 0.25, interrupt: false, });

  const onKeyDown = useCallback((event) => {
    dispatch(wordsKeyPressed({ language: language, code: event.code, key: event.key }));
    dispatch(keyPressed({ code: event.code }));
  }, [language]);

  const onPlayTypingSound = useCallback(() => {
    playTypingSound();
  }, [playTypingSound])

  const onKeyUp = useCallback(() => {
    dispatch(keyClear());
  }, []);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchWords());
    }
  }, [fetchStatus]);

  useEffect(() => {
    document.body.addEventListener("keydown", onPlayTypingSound);

    return () => document.body.removeEventListener("keydown", onPlayTypingSound);
  }, [onPlayTypingSound]);

  useEffect(() => {
    document.body.addEventListener("keyup", onKeyUp);

    return () => document.body.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);

    return () => document.body.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const renderedPreviousWords = ['', ' ', ...previousWords].slice(-2).map((word, i) => (
    <div key={word} className="WordCell">
      <div className="Word">{word}</div>
      <div className="Word">{['', '', ...typedWords].slice(-2)[i]}</div>
    </div>
  ));

  const renderedCursorWord = (
    <div key={cursorWord} className="WordCellFocused">
      <div className="Word">{cursorWord}</div>
      <div className="Word">{userInput}</div>
    </div>
  );

  const renderedNextWords = [...nextWords, '  ', '   '].slice(0, 2).map(word => (
    <div key={word} className="WordCell">
      <div className="Word">{word}</div>
      <div className="Word"></div>
    </div>
  ));

  return (
    <div className="content2">
      <Header />
      <div className="BodyContainer">
        <div className="Body">
          <div className="ContentStatusBarContainer">
            <div className="StatusBarElem">
              <div className="StatueBarElem">진행도</div>
              <div className="StatueBarElem">
                <div className="ProgressBarWrapper">
                  <ProgressBar completed={progressPercent} bgColor="#7BC5C5"/>
                </div>
              </div>
            </div>
            <div className="StatusBarElem">
              <div className="StatueBarElem">오타수</div>
              <div className="StatueBarElem">{wrongCount}</div>
            </div>
            <div className="StatusBarElem">
              <div className="StatueBarElem">정확도</div>
              <div className="StatueBarElem">
                <div className="ProgressBarWrapper">
                  <ProgressBar completed={accuracy} bgColor="#7BC5C5" />
                </div>
              </div>
            </div>
          </div>
          <div className="WordsList">
            {renderedPreviousWords}
            {renderedCursorWord}
            {renderedNextWords}
          </div>
          <div className="KeyboardZone">
            <MacKeyboard style={KeyboardStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}

const KeyboardStyle = {
  margin: 'auto',
  display: 'block',
  width: '50em',
  height: '18em',
}

export default WordsPractice;
