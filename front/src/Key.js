import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import {KeyboardContext} from './Contexts';
import MacKeyboardStyles from './MacKeyboard.styles';

function Key({ displayChar, code }) {
  const keyboard = useContext(KeyboardContext);
  
  const hitCheck = useCallback((code) => {
    // console.log(keyboard);
    return keyboard.currentKey === code ? MacKeyboardStyles.KeyPressedStyle : {};
  }, [keyboard]);

  return (
    <div className="key noselect" style={{ ...KeyStyle, ...styleFactory(code), ...hitCheck(code) }}>
      {displayChar}
    </div>
  )
}

function styleFactory(value) {
  let retStyle = MacKeyboardStyles.KeyDefaultStyle;
  styleFactory.styleMap = {
    'fn': MacKeyboardStyles.KeySmallStyle,
    'ControlLeft': MacKeyboardStyles.KeySmallStyle,
    'ControlRight': MacKeyboardStyles.KeySmallStyle,
    'AltLeft': MacKeyboardStyles.KeySmallStyle,
    'AltRight': MacKeyboardStyles.KeySmallStyle,
    'Tab': MacKeyboardStyles.KeyEscStyle,
    'Backspace': MacKeyboardStyles.KeyEscStyle,
    'Capslock': MacKeyboardStyles.KeyCapsLockStyle,
    'Space': MacKeyboardStyles.KeySpaceBarStyle,
    'MetaLeft': MacKeyboardStyles.KeyCommandStyle,
    'MetaRight': MacKeyboardStyles.KeyCommandStyle,
    'Enter': MacKeyboardStyles.KeyReturnStyle,
    'ShiftLeft': MacKeyboardStyles.KeyShiftStyle,
    'ShiftRight': MacKeyboardStyles.KeyShiftStyle,
  }

  retStyle = { ...retStyle, ...styleFactory.styleMap[value] };

  return retStyle;
}

const KeyStyle = {
  padding: '10px',
  paddingTop: '10px',
  color: 'white',
  margin: '4px',
  fontSize: '1.5rem',
  boxShadow: '0 1px 2px 0 #12CFC0, 0 1px 3px 1px #bdeaff'
};

Key.propTypes = {
  displayChar: PropTypes.string,
  code: PropTypes.string,
};

export default React.memo(Key);
