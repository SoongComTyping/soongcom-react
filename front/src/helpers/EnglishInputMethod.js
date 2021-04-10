import Inko from 'inko';
const inko = new Inko();

/**
 * 영문 입력기
 * @param {Event} event 
 * @param {String} userInput 
 * @returns {String} computedNextInput
 */
function EnglishInputMethod(event, userInput) {
  if (event.key === 'Backspace') {
    return userInput.slice(0, -1);
  }

  if (event.key === 'Enter')
    return userInput.concat('\n');
    
  if (event.key.length > 1)
    return userInput;
  
  return userInput.concat(inko.ko2en(event.key));
}

export { EnglishInputMethod };
