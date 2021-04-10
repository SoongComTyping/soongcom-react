import { createSlice } from '@reduxjs/toolkit';
import { KoreanInputMethod, inko } from '../../helpers/KoreanHelper';
import { EnglishInputMethod } from '../../helpers/EnglishHelper';

const initialState = {
  stage: 0,
  precede: 0,
  cursor: 0,
  data: ['나라', '말', '미리', '나이', '이랑'],
  userInput: '',
  koreanBuffer: '',
}

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    keyPressed(state, action) {
      const { userInput, koreanBuffer } = state;
      const { event, language } = action.payload;

      if (language === 'korean') {
        const { nextUserInput, nextBuf } = KoreanInputMethod(koreanBuffer, event, userInput);
        if (nextUserInput !== userInput) {
          state.userInput = nextUserInput;
        }
        state.koreanBuffer = nextBuf;
      }      
      if (language === 'english') {
        const nextUserInput = EnglishInputMethod(event, userInput);
        state.userInput = nextUserInput;
      }
    },
  }
});

export default wordsSlice.reducer;

export const { keyPressed } = wordsSlice.actions;

export const selectWords = (state) => state.words;

export const selectUserInput = (state) => {
  return state.words.userInput + inko.en2ko(state.words.koreanBuffer);
}
