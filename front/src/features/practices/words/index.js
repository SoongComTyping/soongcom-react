import React, { useCallback, useEffect } from 'react';
import MacKeyboard from '../../keyboards/MacKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import { switchLanguage, keyPressed, keyClear } from '../../keyboards/KeyboardsSlice';
import { keyPressed as wordsSliceKeyPressed, switchLanguage as wordsSliceSwitchLanguage, selectUserInput } from './wordsSlice';

function Header() {
  const dispatch = useDispatch();

  return (
    <section style={HeaderStyle}>
      <h2 style={HeaderTitle}>
        낱말 연습
      </h2>
      <div style={Progress}>
        <div style={{ ...Circle, ...CircleFocussed }}>1</div>
        <div style={Circle}>2</div>
        <div style={Circle}>3</div>
        <div style={Circle}>4</div>
        <div style={Circle}>5</div>
        <div style={Circle}>6</div>
        <div style={Circle}>7</div>
      </div>
      <div style={LanguageSelect}>
        <button className="button" onClick={() => {
          dispatch(wordsSliceSwitchLanguage({language: "korean"}));
          dispatch(switchLanguage({language: "korean"}));
        }}>한</button>
        <button className="button" onClick={() => {
          dispatch(wordsSliceSwitchLanguage({language: "english"}));
          dispatch(switchLanguage({language: "english"}))
        }}>영</button>
      </div>
    </section>
  )
}

function WordsPractice() {
  const dispatch = useDispatch();
  const userInput = useSelector(selectUserInput);

  const onKeyDown = useCallback((event) => {
    dispatch(wordsSliceKeyPressed({event: event}));
    dispatch(keyPressed(event));
  }, []);

  const onKeyUp = useCallback(() => {
    dispatch(keyClear());
  }, []);

  useEffect(() => {
    document.body.addEventListener("keyup", onKeyUp);

    return () => document.body.addEventListener("keyup", onKeyUp);
  }, [onKeyUp])

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);

    return () => document.body.addEventListener("keydown", onKeyDown);
  }, [onKeyDown])

  return (
    <div className="noselect">
      <Header />
      <div style={BodyContainer}>
        <div style={Body}>
          <div style={ContentStatusBarContainer}>
            <div style={{ flex: 1 }}>진행도</div>
            <div style={{ flex: 1 }}>오타수</div>
            <div style={{ flex: 1 }}>정확도</div>
          </div>
          <div style={WordsList}>
            <div style={WordCell}>
              <div style={Word}>나라</div>
              <div style={Word}>나이</div>
            </div>
            <div style={WordCell}>
              <div style={Word}>말</div>
              <div style={Word}>말</div>
            </div>
            <div style={WordCellFocused}>
              <div style={Word}>미리</div>
              <div style={Word}>{userInput}</div>
            </div>
            <div style={WordCell}>
              <div style={Word}>나이</div>
              <div style={Word} />
            </div>
            <div style={WordCell}>
              <div style={Word}>이랑</div>
              <div style={Word} />
            </div>
          </div>
          <div style={KeyboardZone}>
            <MacKeyboard style={KeyboardStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}

const HeaderStyle = {
  width: '100%',
  background: '#FFFFFF',
  height: '80px',
  fontSize: '16px',
  fontFamily: 'Noto Serif KR',
  borderBottom: '2px solid #eeeeee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  color: '#828282',
};

const HeaderTitle = { flex: 20 };
const Progress = { flex: 40, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }
const LanguageSelect = { flex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }

const Circle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  background: 'gray',
  color: 'white',
  fontSize: '30px',
}

const CircleFocussed = {
  background: 'pink',
}


const BodyContainer = {
  display: 'flex',
  height: '70vh',
  alignItems: 'center',
  justifyContent: 'center',
}

const Body = {
  width: '75%',
  height: '60vh',
  display: 'flex',
  border: '3px solid gray',
  borderRadius: '30px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}

const WordsList = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 20px 0 20px',
  background: '#7BC5C5',
  border: '3px solid #7BC5C5',
  borderRadius: '50px',
  flex: 20,
}

const WordCellFocused = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '90%',
  border: '3px solid white',
  borderRadius: '10px',
}

const WordCell = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '100%',
}

const Word = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  fontSize: '1.5em',
  color: 'white',
}

const ContentStatusBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  flex: 10,
}

const KeyboardZone = {
  display: 'flex',
  alignItems: 'center',
  flex: 80,
}

const KeyboardStyle = {
  margin: 'auto',
  display: 'block',
  width: '50em',
  height: '18em',
}

export default WordsPractice;
