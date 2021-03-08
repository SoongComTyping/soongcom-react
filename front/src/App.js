import './App.css';
import React from 'react'
import { useCallback, useEffect, useState } from 'react';
import useSound from 'use-sound';
import keySoundAsset from './mechanicalKeyboard.mp3';
import MacKeyboard from './MacKeyboard';

function App() {
  const [currentKey, setCurrentKey] = useState("");

  const [playKeyPress] = useSound(
    keySoundAsset,
    { volume: 0.25, interrupt: true, },
  )

  const onKeyDown = useCallback((event) => {
    setCurrentKey(event.code);
    playKeyPress();
  }, [playKeyPress])

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

  return (
    <div className="App">
      <MacKeyboard pressedKey={currentKey} style={MacKeyboardStyle} />
    </div>
  );
}

const MacKeyboardStyle = {
  position: 'absolute',
  left: '8em',
  top: '15em',
  display: 'block',
  width: '50em',
  height: '18em',
};

export default App;
