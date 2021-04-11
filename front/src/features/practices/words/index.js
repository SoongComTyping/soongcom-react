import React, { useCallback, useEffect } from 'react';
import MacKeyboard from '../../keyboards/MacKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import { switchLanguage, keyPressed, keyClear } from '../../keyboards/KeyboardsSlice';
import {
  keyPressed as wordsSliceKeyPressed,
  switchLanguage as wordsSliceSwitchLanguage,
  selectUserInput,
  selectPreviousWords,
  selectPreviousTypedWords,
  selectCursorWord,
  selectNextWords,
} from './wordsSlice';
import useSound from 'use-sound';
import keySoundAsset from '../../../mechanicalKeyboard.mp3';
import style from './index.module.scss';

function Header() {
  const dispatch = useDispatch();

  return (
    <section className={style.HeaderStyle}>
      <h2 className={style.HeaderTitle}>
        낱말 연습
      </h2>
      <div className={style.Progress}>
        <div className={style.CircleFocussed}>1</div>
        <div className={style.Circle}>2</div>
        <div className={style.Circle}>3</div>
        <div className={style.Circle}>4</div>
        <div className={style.Circle}>5</div>
        <div className={style.Circle}>6</div>
        <div className={style.Circle}>7</div>
      </div>
      <div className={style.LanguageSelect}>
        <button className="button" onClick={() => {
          dispatch(wordsSliceSwitchLanguage({ language: "korean" }));
          dispatch(switchLanguage({ language: "korean" }));
        }}>한</button>
        <button className="button" onClick={() => {
          dispatch(wordsSliceSwitchLanguage({ language: "english" }));
          dispatch(switchLanguage({ language: "english" }))
        }}>영</button>
      </div>
    </section>
  )
}

function WordsPractice() {
  const dispatch = useDispatch();
  const userInput = useSelector(selectUserInput);
  const previousWords = useSelector(selectPreviousWords);
  const typedWords = useSelector(selectPreviousTypedWords);
  const cursorWord = useSelector(selectCursorWord);
  const nextWords = useSelector(selectNextWords);
  const [playTypingSound] = useSound(keySoundAsset, { volume: 0.25, interrupt: true, });

  const onKeyDown = useCallback((event) => {
    dispatch(wordsSliceKeyPressed({ code: event.code, key: event.key }));
    dispatch(keyPressed({ code: event.code }));
  }, []);

  const onPlayTypingSound = useCallback(() => {
    playTypingSound();
  }, [playTypingSound])

  const onKeyUp = useCallback(() => {
    dispatch(keyClear());
  }, []);

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
    <div className="noselect">
      <Header />
      <div className={style.BodyContainer}>
        <div className={style.Body}>
          <div className={style.ContentStatusBarContainer}>
            <div style={{ flex: 1 }}>진행도</div>
            <div style={{ flex: 1 }}>오타수</div>
            <div style={{ flex: 1 }}>정확도</div>
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
