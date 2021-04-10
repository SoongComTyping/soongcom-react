import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import {KeyboardContext} from '../../Contexts';
import KeyStyles from './Key.styles';
import KeySkin from './KeySkin';

function Key({ displayChar, code }) {
  const keyboard = useContext(KeyboardContext);
  
  const hitCheck = useCallback((code) => {
    return keyboard.currentKey === code ? KeyStyles.KeyPressedStyle : {};
  }, [keyboard]);

  return (
    <div className="key noselect" style={{ ...styleFactory(code), ...hitCheck(code) }}>
      {keyboard.language === 'english' ? displayChar : KeySkin[keyboard.language][displayChar]}
    </div>
  )
}

function styleFactory(value) {
  let retStyle = KeyStyles.KeyDefaultStyle;
  styleFactory.styleMap = {
    'fn': KeyStyles.KeySmallStyle,
    'ControlLeft': KeyStyles.KeySmallStyle,
    'ControlRight': KeyStyles.KeySmallStyle,
    'AltLeft': KeyStyles.KeySmallStyle,
    'AltRight': KeyStyles.KeySmallStyle,
    'Tab': KeyStyles.KeyEscStyle,
    'Backspace': KeyStyles.KeyEscStyle,
    'Capslock': KeyStyles.KeyCapsLockStyle,
    'Space': KeyStyles.KeySpaceBarStyle,
    'MetaLeft': KeyStyles.KeyCommandStyle,
    'MetaRight': KeyStyles.KeyCommandStyle,
    'Enter': KeyStyles.KeyReturnStyle,
    'ShiftLeft': KeyStyles.KeyShiftStyle,
    'ShiftRight': KeyStyles.KeyShiftStyle,
  }

  retStyle = { ...retStyle, ...styleFactory.styleMap[value] };

  return retStyle;
}

Key.propTypes = {
  displayChar: PropTypes.string,
  code: PropTypes.string,
};

export default React.memo(Key);
