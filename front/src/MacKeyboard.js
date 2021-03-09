import React from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import MacKeyboardStyles from './MacKeyboard.styles';

function MacKeyboard({ style }) {
  
  return (
    <div className="keyboard" style={style}>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key displayChar="~" code='Backquote' />
        <Key displayChar="1" code='Digit1' />
        <Key displayChar="2" code='Digit2' />
        <Key displayChar="3" code='Digit3' />
        <Key displayChar="4" code='Digit4' />
        <Key displayChar="5" code='Digit5' />
        <Key displayChar="6" code='Digit6' />
        <Key displayChar="7" code='Digit7' />
        <Key displayChar="8" code='Digit8' />
        <Key displayChar="9" code='Digit9' />
        <Key displayChar="0" code='Digit0' />
        <Key displayChar="-" code='Minus' />
        <Key displayChar="=" code='Equal' />
        <Key displayChar="Delete" code="Backspace" />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key displayChar="Tab" code='Tab' />
        <Key displayChar="q" code='KeyQ' />
        <Key displayChar="w" code='KeyW' />
        <Key displayChar="e" code='KeyE' />
        <Key displayChar="r" code='KeyR' />
        <Key displayChar="t" code='KeyT' />
        <Key displayChar="y" code='KeyY' />
        <Key displayChar="u" code='KeyU' />
        <Key displayChar="i" code='KeyI' />
        <Key displayChar="o" code='KeyO' />
        <Key displayChar="p" code='KeyP' />
        <Key displayChar="[" code='BracketLeft' />
        <Key displayChar="]" code='BracketRight' />
        <Key displayChar="\" code='Backslash' />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key displayChar="CAPS" code='Capslock' />
        <Key displayChar="a" code='KeyA' />
        <Key displayChar="s" code='KeyS' />
        <Key displayChar="d" code='KeyD' />
        <Key displayChar="f" code='KeyF' />
        <Key displayChar="g" code='KeyG' />
        <Key displayChar="h" code='KeyH' />
        <Key displayChar="j" code='KeyJ' />
        <Key displayChar="k" code='KeyK' />
        <Key displayChar="l" code='KeyL' />
        <Key displayChar=";" code='Semicolon' />
        <Key displayChar="'" code='Quote' />
        <Key displayChar="return" code='Enter' />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key displayChar="⇧" code='ShiftLeft' />
        <Key displayChar="z" code='KeyZ' />
        <Key displayChar="x" code='KeyX' />
        <Key displayChar="c" code='KeyC' />
        <Key displayChar="v" code='KeyV' />
        <Key displayChar="b" code='KeyB' />
        <Key displayChar="n" code='KeyN' />
        <Key displayChar="m" code='KeyM' />
        <Key displayChar="," code='Comma' />
        <Key displayChar="." code='Period' />
        <Key displayChar="/" code='Slash' />
        <Key displayChar="⇧" code='ShiftRight' />
      </div>
      <div className="keyboard-row" style={MacKeyboardStyles.KeyboardRowStyle}>
        <Key displayChar="fn" code ='fn' />
        <Key displayChar="^" code='ControlLeft' />
        <Key displayChar="⌥" code='AltLeft' />
        <Key displayChar="⌘" code='MetaLeft' />
        <Key displayChar=" " code='Space' />
        <Key displayChar="⌘" code='MetaRight' />
        <Key displayChar="⌥" code='AltRight' />
        <Key displayChar="<" code='ArrowLeft' />
        <Key displayChar="|" code='ArrowDown' />
        <Key displayChar=">" code='ArrowRight' />
      </div>
    </div>
  )
}

MacKeyboard.propTypes = {
  pressedKey: PropTypes.string,
  style: PropTypes.object,
}

export default React.memo(MacKeyboard);
