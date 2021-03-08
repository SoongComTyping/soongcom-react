import React from 'react';
import Key from './Key';
import MacKeyboardStyles from './MacKeyboard.styles';

function MacKeyboard({ pressedKey, style }) {

  return (
    <div className="keyboard" style={style}>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="~" customStyle={getStyle('~', pressedKey)} />
        <Key value="1" customStyle={getStyle('1', pressedKey)} />
        <Key value="2" customStyle={getStyle('2', pressedKey)} />
        <Key value="3" customStyle={getStyle('3', pressedKey)} />
        <Key value="4" customStyle={getStyle('4', pressedKey)} />
        <Key value="5" customStyle={getStyle('5', pressedKey)} />
        <Key value="6" customStyle={getStyle('6', pressedKey)} />
        <Key value="7" customStyle={getStyle('7', pressedKey)} />
        <Key value="8" customStyle={getStyle('8', pressedKey)} />
        <Key value="9" customStyle={getStyle('9', pressedKey)} />
        <Key value="0" customStyle={getStyle('0', pressedKey)} />
        <Key value="-" customStyle={getStyle('-', pressedKey)} />
        <Key value="=" customStyle={getStyle('=', pressedKey)} />
        <Key value="Delete" customStyle={getStyle('backspace', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="Tab" customStyle={getStyle('tab', pressedKey)} />
        <Key value="q" customStyle={getStyle('q', pressedKey)} />
        <Key value="w" customStyle={getStyle('w', pressedKey)} />
        <Key value="e" customStyle={getStyle('e', pressedKey)} />
        <Key value="r" customStyle={getStyle('r', pressedKey)} />
        <Key value="t" customStyle={getStyle('t', pressedKey)} />
        <Key value="y" customStyle={getStyle('y', pressedKey)} />
        <Key value="u" customStyle={getStyle('u', pressedKey)} />
        <Key value="i" customStyle={getStyle('i', pressedKey)} />
        <Key value="o" customStyle={getStyle('o', pressedKey)} />
        <Key value="p" customStyle={getStyle('p', pressedKey)} />
        <Key value="[" customStyle={getStyle('[', pressedKey)} />
        <Key value="]" customStyle={getStyle(']', pressedKey)} />
        <Key value="\" customStyle={getStyle('\\', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="CAPS" customStyle={getStyle('capslock', pressedKey)} />
        <Key value="a" customStyle={getStyle('a', pressedKey)} />
        <Key value="s" customStyle={getStyle('s', pressedKey)} />
        <Key value="d" customStyle={getStyle('d', pressedKey)} />
        <Key value="f" customStyle={getStyle('f', pressedKey)} />
        <Key value="g" customStyle={getStyle('g', pressedKey)} />
        <Key value="h" customStyle={getStyle('h', pressedKey)} />
        <Key value="j" customStyle={getStyle('j', pressedKey)} />
        <Key value="k" customStyle={getStyle('k', pressedKey)} />
        <Key value="l" customStyle={getStyle('l', pressedKey)} />
        <Key value=";" customStyle={getStyle(';', pressedKey)} />
        <Key value="'" customStyle={getStyle("'", pressedKey)} />
        <Key value="return" customStyle={getStyle("enter", pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="⇧" customStyle={getStyle('shift', pressedKey)} />
        <Key value="z" customStyle={getStyle('z', pressedKey)} />
        <Key value="x" customStyle={getStyle('x', pressedKey)} />
        <Key value="c" customStyle={getStyle('c', pressedKey)} />
        <Key value="v" customStyle={getStyle('v', pressedKey)} />
        <Key value="b" customStyle={getStyle('b', pressedKey)} />
        <Key value="n" customStyle={getStyle('n', pressedKey)} />
        <Key value="m" customStyle={getStyle('m', pressedKey)} />
        <Key value="," customStyle={getStyle(',', pressedKey)} />
        <Key value="." customStyle={getStyle('.', pressedKey)} />
        <Key value="/" customStyle={getStyle('/', pressedKey)} />
        <Key value="⇧" customStyle={getStyle('shift', pressedKey)} />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key value="fn" customStyle={getStyle('fn', pressedKey)} />
        <Key value="^" customStyle={getStyle('control', pressedKey)} />
        <Key value="⌥" customStyle={getStyle('alt', pressedKey)} />
        <Key value="⌘" customStyle={getStyle('meta', pressedKey)} />
        <Key value="   " customStyle={getStyle(' ', pressedKey)} />
        <Key value="⌘" customStyle={getStyle('meta', pressedKey)} />
        <Key value="⌥" customStyle={getStyle('alt', pressedKey)} />
        <Key value="<" customStyle={getStyle('arrowleft', pressedKey)} />
        <Key value="|" customStyle={getStyle('arrowdown', pressedKey)} />
        <Key value=">" customStyle={getStyle('arrowright', pressedKey)} />
      </div>
    </div>
  )
}

function getStyle(value, pressedKey) {
  let retStyle = MacKeyboardStyles.KeyDefaultStyle;
  getStyle.styleMap = {
    'fn': MacKeyboardStyles.KeySmallStyle,
    'control': MacKeyboardStyles.KeySmallStyle,
    'alt': MacKeyboardStyles.KeySmallStyle,
    'tab': MacKeyboardStyles.KeyEscStyle,
    'backspace': MacKeyboardStyles.KeyEscStyle,
    'capslock': MacKeyboardStyles.KeyCapsLockStyle,
    ' ': MacKeyboardStyles.KeySpaceBarStyle,
    'meta': MacKeyboardStyles.KeyCommandStyle,
    'enter': MacKeyboardStyles.KeyReturnStyle,
    'shift': MacKeyboardStyles.KeyShiftStyle,
  }

  retStyle = { ...retStyle, ...getStyle.styleMap[value] };
  pressedKey = pressedKey.toLowerCase();
  if (value === pressedKey) {
    retStyle = { ...retStyle, ...MacKeyboardStyles.KeyPressedStyle };
  }

  return retStyle;
}

export default React.memo(MacKeyboard);
