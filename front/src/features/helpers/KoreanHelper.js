import Inko from 'inko';
let inko = new Inko();

function KoreanInputMethod(buf, event, userInput) {
  /**
   * return {nextUserInput, nextBuf}
   */
  if (event.code.includes('Key')) { // q w e r 같은 입력들 (사파리에서는 ㅂ ㅈ ㄷ ㄱ로 들어와서 한번 영어로 변환해줘야함)
    if (inko.en2ko(buf.concat(event.key)).length > 1) {
      // 버퍼가 꽉차서 다음글자로 넘어가면
      const totalBuff = inko.en2ko(buf.concat(inko.ko2en(event.key)));
      
      return {
        nextUserInput: userInput.concat(totalBuff.slice(0, -1)),
        nextBuf: inko.ko2en(totalBuff.slice(-1))
      };
    }
    return {
      nextUserInput: userInput,
      nextBuf: buf.concat(inko.ko2en(event.key)),
    };
  }
  if (event.code.includes('Digit')) { // 숫자 입력들
    return {
      nextUserInput: userInput.concat(inko.en2ko(buf.concat(event.key))),
      nextBuf: '',
    };
  }
  if (event.key.length > 1) { // meta, enter, ctrl같은 특수 입력들
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (buf === '') {
        return {
          nextUserInput: userInput.slice(0, -1),
          nextBuf: '',
        };
      }
      return {
        nextUserInput: userInput,
        nextBuf: buf.slice(0, -1),
      };
    }
    if (event.key === 'Enter') {
      return {
        nextUserInput: userInput.concat(inko.en2ko(buf.concat('\n'))),
        nextBuf: '',
      };
    }

    return {
      nextUserInput: userInput,
      nextBuf: buf,
    };
  }
  if ([' ', '.', ',', '`', '+', '=', '[', ']', '/', ';', ':', '"', "'", '{', '}', '_', '+', '\\', '|', '~', '<', '>', '?'].includes(event.key)) {
    return {
      nextUserInput: userInput.concat(inko.en2ko(buf.concat(event.key))),
      nextBuf: '',
    };
  }

  return {
    nextUserInput: userInput,
    nextBuf: buf.concat(event.key),
  };
}

export { inko, KoreanInputMethod };
