import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { KoreanInputMethod, inko } from '../../../helpers/KoreanInputMethod';
import { EnglishInputMethod } from '../../../helpers/EnglishInputMethod';
import { client } from '../../../api/client';

const initialState = {
  level: 1,
  cursor: 0,
  datas: [],
  typedDatas: [],
  userInput: '',
  koreanBuffer: '',
  language: 'korean',
  status: 'idle',
};

export const fetchWords = createAsyncThunk('words/fetch', async (_, { getState, }) => {
  const { language, level } = getState().words;
  const response = await client.get(`/api/words?` + new URLSearchParams({ language, level }));
  return response.data;
});

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    keyPressed(state, action) {
      const { userInput, koreanBuffer, language } = state;
      const { code, key } = action.payload;
      const event = { code, key };

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

      if (event.key === 'Enter') {
        state.typedDatas.push(state.userInput);
        state.userInput = '';
        state.koreanBuffer = '';
        if (state.cursor < state.datas.length)
          state.cursor ++;
        if (state.cursor === state.datas.length) {
          state.level ++;
          state.status = 'idle';
        }
      }
    },
    switchLanguage(state, action) {
      state.language = action.payload.language;
      state.status = 'idle';
      state.level = 1;
      state.cursor = 0;
      state.userInput = '';
      state.datas = [];
      state.typedDatas = [];
      state.koreanBuffer = '';
    },
  },
  extraReducers: {
    [fetchWords.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.datas = action.payload;
      state.typedDatas = [];
      state.cursor = 0;
    },
  }
});

export default wordsSlice.reducer;

export const { keyPressed, switchLanguage } = wordsSlice.actions;

export const selectWords = (state) => state.words;

export const selectUserInput = createSelector(
  [selectWords],
  (words) => words.userInput + inko.en2ko(words.koreanBuffer)
);

export const selectCursorWord = createSelector(
  [selectWords],
  (words) => {
    return words.datas[words.cursor];
  }
);

export const selectPreviousWords = createSelector(
  [selectWords],
  (words) => {
    const l = Math.max(0, words.cursor - 2);
    return words.datas.slice(l, words.cursor);
  }
);

export const selectPreviousTypedWords = createSelector(
  [selectWords],
  (words) => {
    const l = Math.max(0, words.cursor - 2);
    return words.typedDatas.slice(l, words.cursor);
  }
);

export const selectNextWords = createSelector(
  [selectWords],
  (words) => {
    const l = Math.min(words.cursor + 1, words.datas.length);
    const r = Math.min(words.datas.length, words.cursor + 3)
    return words.datas.slice(l, r);
  }
);
