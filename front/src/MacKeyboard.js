import React from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import MacKeyboardStyles from './MacKeyboard.styles';

function MacKeyboard({ pressedKey, style }) {

  return (
    <div className="keyboard" style={style}>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="~" customStyle={getStyle('Backquote', pressedKey)} />
        <Key value="1" customStyle={getStyle('Digit1', pressedKey)} />
        <Key value="2" customStyle={getStyle('Digit2', pressedKey)} />
        <Key value="3" customStyle={getStyle('Digit3', pressedKey)} />
        <Key value="4" customStyle={getStyle('Digit4', pressedKey)} />
        <Key value="5" customStyle={getStyle('Digit5', pressedKey)} />
        <Key value="6" customStyle={getStyle('Digit6', pressedKey)} />
        <Key value="7" customStyle={getStyle('Digit7', pressedKey)} />
        <Key value="8" customStyle={getStyle('Digit8', pressedKey)} />
        <Key value="9" customStyle={getStyle('Digit9', pressedKey)} />
        <Key value="0" customStyle={getStyle('Digit0', pressedKey)} />
        <Key value="-" customStyle={getStyle('Minus', pressedKey)} />
        <Key value="=" customStyle={getStyle('Equal', pressedKey)} />
        <Key value="Delete" customStyle={getStyle('Backspace', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="Tab" customStyle={getStyle('Tab', pressedKey)} />
        <Key value="q" customStyle={getStyle('KeyQ', pressedKey)} />
        <Key value="w" customStyle={getStyle('KeyW', pressedKey)} />
        <Key value="e" customStyle={getStyle('KeyE', pressedKey)} />
        <Key value="r" customStyle={getStyle('KeyR', pressedKey)} />
        <Key value="t" customStyle={getStyle('KeyT', pressedKey)} />
        <Key value="y" customStyle={getStyle('KeyY', pressedKey)} />
        <Key value="u" customStyle={getStyle('KeyU', pressedKey)} />
        <Key value="i" customStyle={getStyle('KeyI', pressedKey)} />
        <Key value="o" customStyle={getStyle('KeyO', pressedKey)} />
        <Key value="p" customStyle={getStyle('KeyP', pressedKey)} />
        <Key value="[" customStyle={getStyle('BracketLeft', pressedKey)} />
        <Key value="]" customStyle={getStyle('BracketRight', pressedKey)} />
        <Key value="\" customStyle={getStyle('Backslash', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="CAPS" customStyle={getStyle('Capslock', pressedKey)} />
        <Key value="a" customStyle={getStyle('KeyA', pressedKey)} />
        <Key value="s" customStyle={getStyle('KeyS', pressedKey)} />
        <Key value="d" customStyle={getStyle('KeyD', pressedKey)} />
        <Key value="f" customStyle={getStyle('KeyF', pressedKey)} />
        <Key value="g" customStyle={getStyle('KeyG', pressedKey)} />
        <Key value="h" customStyle={getStyle('KeyH', pressedKey)} />
        <Key value="j" customStyle={getStyle('KeyJ', pressedKey)} />
        <Key value="k" customStyle={getStyle('KeyK', pressedKey)} />
        <Key value="l" customStyle={getStyle('KeyL', pressedKey)} />
        <Key value=";" customStyle={getStyle('Semicolon', pressedKey)} />
        <Key value="'" customStyle={getStyle("Quote", pressedKey)} />
        <Key value="return" customStyle={getStyle("Enter", pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="⇧" customStyle={getStyle('ShiftLeft', pressedKey)} />
        <Key value="z" customStyle={getStyle('KeyZ', pressedKey)} />
        <Key value="x" customStyle={getStyle('KeyX', pressedKey)} />
        <Key value="c" customStyle={getStyle('KeyC', pressedKey)} />
        <Key value="v" customStyle={getStyle('KeyV', pressedKey)} />
        <Key value="b" customStyle={getStyle('KeyB', pressedKey)} />
        <Key value="n" customStyle={getStyle('KeyN', pressedKey)} />
        <Key value="m" customStyle={getStyle('KeyM', pressedKey)} />
        <Key value="," customStyle={getStyle('Comma', pressedKey)} />
        <Key value="." customStyle={getStyle('Period', pressedKey)} />
        <Key value="/" customStyle={getStyle('Slash', pressedKey)} />
        <Key value="⇧" customStyle={getStyle('ShiftRight', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="fn" customStyle={getStyle('fn', pressedKey)} />
        <Key value="^" customStyle={getStyle('ControlLeft', pressedKey)} />
        <Key value="⌥" customStyle={getStyle('AltLeft', pressedKey)} />
        <Key value="⌘" customStyle={getStyle('MetaLeft', pressedKey)} />
        <Key value="  " customStyle={getStyle('Space', pressedKey)} />
        <Key value="⌘" customStyle={getStyle('MetaRight', pressedKey)} />
        <Key value="⌥" customStyle={getStyle('AltRight', pressedKey)} />
        <Key value="<" customStyle={getStyle('ArrowLeft', pressedKey)} />
        <Key value="|" customStyle={getStyle('ArrowDown', pressedKey)} />
        <Key value=">" customStyle={getStyle('ArrowRight', pressedKey)} />
      </div>
    </div>
  )
}

function getStyle(value, pressedKey) {
  let retStyle = MacKeyboardStyles.KeyDefaultStyle;
  getStyle.styleMap = {
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

  retStyle = { ...retStyle, ...getStyle.styleMap[value] };
  // pressedKey = pressedKey.toLowerCase();
  if (value === pressedKey) {
    retStyle = { ...retStyle, ...MacKeyboardStyles.KeyPressedStyle };
  }

  return retStyle;
}

MacKeyboard.propTypes = {
  pressedKey: PropTypes.string,
  style: PropTypes.object,
}

export default React.memo(MacKeyboard);
