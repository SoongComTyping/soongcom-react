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
import style from './index.module.scss';
import '../../../sass/main.css';

function Header() {
  const dispatch = useDispatch();
  const language = useSelector(selectKeyboardsLanguage);
  const level = useSelector((state) => state.words.level);

  const renderedLevel = [1, 2, 3, 4, 5, 6, 7].map(n => {
    const foccussed = level === n;
    let cName = foccussed ? style.CircleFocussed : style.Circle;

    return (
      <div key={`${n} ${foccussed}`} className={cName}>{n}</div>
    )
  });

  return (
    <section className={style.HeaderStyle}>
      <h2 className={style.HeaderTitle}>
        낱말 연습
      </h2>
      <div className={style.Progress}>
        {renderedLevel}
      </div>
      <form className={style.LanguageSelect}>
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
    <div key={word} className={style.WordCell}>
      <div className={style.Word}>{word}</div>
      <div className={style.Word}>{['', '', ...typedWords].slice(-2)[i]}</div>
    </div>
  ));

  const renderedCursorWord = (
    <div key={cursorWord} className={style.WordCellFocused}>
      <div className={style.Word}>{cursorWord}</div>
      <div className={style.Word}>{userInput}</div>
    </div>
  );

  const renderedNextWords = [...nextWords, '  ', '   '].slice(0, 2).map(word => (
    <div key={word} className={style.WordCell}>
      <div className={style.Word}>{word}</div>
      <div className={style.Word}></div>
    </div>
  ));

  return (
    <div className="content2">
      <Header />
      <div className={style.BodyContainer}>
        <div className={style.Body}>
          <div className={style.ContentStatusBarContainer}>
            <div className={style.StatusBarElem}>
              <div className={style.StatueBarElem}>진행도</div>
              <div className={style.StatueBarElem}>
                <div className={style.ProgressBarWrapper}>
                  <ProgressBar completed={progressPercent} bgColor="#7BC5C5"/>
                </div>
              </div>
            </div>
            <div className={style.StatusBarElem}>
              <div className={style.StatueBarElem}>오타수</div>
              <div className={style.StatueBarElem}>{wrongCount}</div>
            </div>
            <div className={style.StatusBarElem}>
              <div className={style.StatueBarElem}>정확도</div>
              <div className={style.StatueBarElem}>
                <div className={style.ProgressBarWrapper}>
                  <ProgressBar completed={accuracy} bgColor="#7BC5C5" />
                </div>
              </div>
            </div>
          </div>
          <div className={style.WordsList}>
            {renderedPreviousWords}
            {renderedCursorWord}
            {renderedNextWords}
          </div>
          <div className={style.KeyboardZone}>
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
