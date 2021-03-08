import React from 'react';
import Key from './Key';

function MacKeyboard ( { pressedKey } ) {
    // TODO: 인자로 넘어온 pressedKey의 색상을 다르게해서 표시하기.
    console.log(pressedKey);

    return (
        <div className="keyboard" style={MacKeyboardStyle}>
            <div className="keyboard-row" style={KeyboardRowStyle}>
                <Key value="~" customStyle={KeyDefaultStyle} />
                <Key value="1" customStyle={KeyDefaultStyle} />
                <Key value="2" customStyle={KeyDefaultStyle} />
                <Key value="3" customStyle={KeyDefaultStyle} />
                <Key value="4" customStyle={KeyDefaultStyle} />
                <Key value="5" customStyle={KeyDefaultStyle} />
                <Key value="7" customStyle={KeyDefaultStyle} />
                <Key value="8" customStyle={KeyDefaultStyle} />
                <Key value="9" customStyle={KeyDefaultStyle} />
                <Key value="0" customStyle={KeyDefaultStyle} />
                <Key value="-" customStyle={KeyDefaultStyle} />
                <Key value="+" customStyle={KeyDefaultStyle} />
                <Key value="Delete" customStyle={{...KeyDefaultStyle, ...KeyEscStyle}} />
            </div>
            <div className="keyboard-row" style={KeyboardRowStyle}>
                <Key value="tab" customStyle={{...KeyDefaultStyle, ...KeyEscStyle}} />
                <Key value="q" customStyle={KeyDefaultStyle} />
                <Key value="w" customStyle={KeyDefaultStyle} />
                <Key value="e" customStyle={KeyDefaultStyle} />
                <Key value="r" customStyle={KeyDefaultStyle} />
                <Key value="t" customStyle={KeyDefaultStyle} />
                <Key value="y" customStyle={KeyDefaultStyle} />
                <Key value="u" customStyle={KeyDefaultStyle} />
                <Key value="i" customStyle={KeyDefaultStyle} />
                <Key value="o" customStyle={KeyDefaultStyle} />
                <Key value="p" customStyle={KeyDefaultStyle} />
                <Key value="[" customStyle={KeyDefaultStyle} />
                <Key value="}" customStyle={KeyDefaultStyle} />
                <Key value="\" customStyle={KeyDefaultStyle} />
            </div>
            <div className="keyboard-row" style={KeyboardRowStyle}>
                <Key value="CAPS" customStyle={{...KeyDefaultStyle, ...KeyCapsLockStyle}} />
                <Key value="a" customStyle={KeyDefaultStyle} />
                <Key value="s" customStyle={KeyDefaultStyle} />
                <Key value="d" customStyle={KeyDefaultStyle} />
                <Key value="f" customStyle={KeyDefaultStyle} />
                <Key value="g" customStyle={KeyDefaultStyle} />
                <Key value="h" customStyle={KeyDefaultStyle} />
                <Key value="j" customStyle={KeyDefaultStyle} />
                <Key value="k" customStyle={KeyDefaultStyle} />
                <Key value="l" customStyle={KeyDefaultStyle} />
                <Key value=";" customStyle={KeyDefaultStyle} />
                <Key value="'" customStyle={KeyDefaultStyle} />
                <Key value="return" customStyle={{...KeyDefaultStyle, ...KeyReturnStyle}} />
            </div>
            <div className="keyboard-row" style={KeyboardRowStyle}>
                <Key value="⇧" customStyle={{...KeyDefaultStyle, ...KeyShiftStyle}} />
                <Key value="z" customStyle={KeyDefaultStyle} />
                <Key value="x" customStyle={KeyDefaultStyle} />
                <Key value="c" customStyle={KeyDefaultStyle} />
                <Key value="v" customStyle={KeyDefaultStyle} />
                <Key value="b" customStyle={KeyDefaultStyle} />
                <Key value="n" customStyle={KeyDefaultStyle} />
                <Key value="m" customStyle={KeyDefaultStyle} />
                <Key value="," customStyle={KeyDefaultStyle} />
                <Key value="." customStyle={KeyDefaultStyle} />
                <Key value="/" customStyle={KeyDefaultStyle} />
                <Key value="⇧" customStyle={{...KeyDefaultStyle, ...KeyShiftStyle}} />
            </div>
            <div className="keyboard-row" style={KeyboardRowStyle}>
                <Key value="fn" customStyle={KeyDefaultStyle} />
                <Key value="^" customStyle={KeyDefaultStyle} />
                <Key value="⌥" customStyle={KeyDefaultStyle} />
                <Key value="⌘" customStyle={KeyDefaultStyle} />
                <Key value="   " customStyle={{...KeyDefaultStyle, ...KeySpaceBarStyle}} />
                <Key value="⌘" customStyle={KeyDefaultStyle} />
                <Key value="⌥" customStyle={KeyDefaultStyle} />
                <Key value="<" customStyle={KeyDefaultStyle} />
                <Key value="|" customStyle={KeyDefaultStyle} />
                <Key value=">" customStyle={KeyDefaultStyle} />
            </div>
        </div>
    )
}

const MacKeyboardStyle = {
    backgroundColor: '#151515',
    position: 'absolute',
    left: '8em',
    top: '15em',
    display: 'block',
    width: '50em',
    height: '18em',
};

const KeyDefaultStyle = {
    color: "#FB9FB1", // F5F5F5
    width: '32px',
};

const KeyPressedStyle = {
    backgroundColor: '#505050', // bright black
};

const KeyEscStyle = {
    width: '60px',
    fontSize: '1.2em',
};

const KeyCapsLockStyle = {
    width: '70px',
    fontSize: '1.2em',
};

const KeyReturnStyle = {
    width: '70px',
    fontSize: '1.2em',
}

const KeyShiftStyle = {
    width: '80px',
}

const KeySpaceBarStyle = {
    width: '300px',
}

const KeySmallStyle = {
    width: '30px',
}

const KeyboardRowStyle = {
    display: 'flex',
};

export default React.memo(MacKeyboard);
