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
  keyPressed as positionsKeyPressed,
  switchLanguage as positionsSwitchLanguage,
  selectUserInput,
  selectPreviousKeys,
  selectPreviousTypedKeys,
  selectCursorKey,
  selectNextKeys,
  fetchKeys,
  selectFetchStatus,
  selectProgressPercent,
  selectWrongCount,
  selectAccuracy,
} from './keysSlice';
import ProgressBar from "@ramonak/react-progress-bar";
import useSound from 'use-sound';
import keySoundAsset from '../../../mechanicalKeyboard.mp3';

function Header() {
  const dispatch = useDispatch();
  const language = useSelector(selectKeyboardsLanguage);
  const level = useSelector((state) => state.keys.level);

  const renderedLevel = [1, 2, 3, 4, 5, 6, 7].map(n => {
    const foccussed = level === n;
    let cName = foccussed ? "CircleFocussed" : "Circle";

    return (
      <div key={`${n} ${foccussed}`} className={cName}>{n}</div>
    )
  });

  return (
    <section className="HeaderStyle">
      <h2 className="HeaderTitle">
        자리연습
      </h2>
      <div className="Progress">
        {renderedLevel}
      </div>
      <form className="LanguageSelect">
        <label htmlFor="korean">한</label>
        <input type="checkbox" checked={language==='korean'} readOnly id="korean" onClick={() => {
          dispatch(positionsSwitchLanguage({ language: "korean" }));
          dispatch(switchLanguage({ language: "korean" }));
        }}/>
        <label htmlFor="english">영</label>
        <input type="checkbox" checked={language==='english'} readOnly id="english" onClick={() => {
          dispatch(positionsSwitchLanguage({ language: "english" }));
          dispatch(switchLanguage({ language: "english" }))
        }}/>
      </form>
    </section>
  )
}

function KeysPractice() {
  const dispatch = useDispatch();
  const language = useSelector(selectKeyboardsLanguage);
  const userInput = useSelector(selectUserInput);
  const previousKeys = useSelector(selectPreviousKeys);
  const typedKeys = useSelector(selectPreviousTypedKeys);
  const cursorKey = useSelector(selectCursorKey);
  const nextKeys = useSelector(selectNextKeys);
  const fetchStatus = useSelector(selectFetchStatus);
  const progressPercent = useSelector(selectProgressPercent);
  const wrongCount = useSelector(selectWrongCount);
  const accuracy = useSelector(selectAccuracy);
  const [playTypingSound] = useSound(keySoundAsset, { volume: 0.25, interrupt: false, });

  const onKeyDown = useCallback((event) => {
    dispatch(positionsKeyPressed({ language: language, code: event.code, key: event.key }));
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
      dispatch(fetchKeys());
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

  const renderedPreviousKeys = ['', ' ', ...previousKeys].slice(-2).map((key, i) => (
    <div key={key} className="WordCell">
      <div className="Word">{key}</div>
      <div className="Word">{['', '', ...typedKeys].slice(-2)[i]}</div>
    </div>
  ));

  const renderedCursorKey = (
    <div key={cursorKey} className="WordCellFocused">
      <div className="Word">{cursorKey}</div>
      <div className="Word">{userInput}</div>
    </div>
  );

  const renderedNextKeys = [...nextKeys, '  ', '   '].slice(0, 2).map(key => (
    <div key={key} className="WordCell">
      <div className="Word">{key}</div>
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
            {renderedPreviousKeys}
            {renderedCursorKey}
            {renderedNextKeys}
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

export default KeysPractice;
