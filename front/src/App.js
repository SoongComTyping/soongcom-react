import './App.css';
import { useCallback, useEffect, useState } from 'react';
import MacKeyboard from './MacKeyboard';

function App() {
  const [currentKey, setCurrentKey] = useState("");

  const onKeyDown = useCallback((event) => {
    setCurrentKey(event.key);
    event.stopPropagation();
  }, [currentKey])

  const onKeyUp = useCallback((event) => {
    setCurrentKey("");
    event.stopPropagation();
  }, [currentKey]);
  
  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    }
  })

  useEffect(() => {
    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.addEventListener("keyup", onKeyUp);
    }
  })

  return (
    <div className="App">
      <MacKeyboard pressedKey={currentKey}/>
    </div>
  );
}

export default App;
