import { createSlice } from '@reduxjs/toolkit';
import { KoreanInputMethod, inko } from '../../../helpers/KoreanInputMethod';
import { EnglishInputMethod } from '../../../helpers/EnglishInputMethod';

const initialState = {
  stage: 0,
  precede: 0,
  cursor: 0,
  data: ['나라', '말', '미리', '나이', '이랑'],
  userInput: '',
  koreanBuffer: '',
  language: 'korean',
}

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    keyPressed(state, action) {
      const { userInput, koreanBuffer, language } = state;
      const { event } = action.payload;

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
    switchLanguage(state, action) {
      state.language = action.payload.language;
    },
  }
});

export default wordsSlice.reducer;

export const { keyPressed, switchLanguage } = wordsSlice.actions;

export const selectWords = (state) => state.words;

export const selectUserInput = (state) => {
  return state.words.userInput + inko.en2ko(state.words.koreanBuffer);
}
