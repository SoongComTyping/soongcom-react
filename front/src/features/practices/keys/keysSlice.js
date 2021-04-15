import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { inko } from '../../../helpers/KoreanInputMethod';
import { EnglishInputMethod } from '../../../helpers/EnglishInputMethod';
import { client } from '../../../api/client';

const initialState = {
  level: 1,
  cursor: 0,
  datas: [],
  typedDatas: [],
  userInput: '',
  koreanBuffer: '',
  fetchStatus: 'idle',
};

export const fetchKeys = createAsyncThunk('keys/fetch', async (_, { getState, }) => {
  const { level } = getState().keys;
  const { language } = getState().keyboards;
  const response = await client.get(`/api/keys?` + new URLSearchParams({ language, level }));
  return response.data;
});

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    keyPressed(state, action) {
      const { userInput } = state;
      const { code, key, language } = action.payload;
      const event = { code, key };

      if (key.length > 1) return;

      if (language === 'korean') {
        state.userInput = inko.en2ko(key);
      }
      if (language === 'english') {
        const nextUserInput = EnglishInputMethod(event, userInput);
        state.userInput = nextUserInput;
      }

      state.typedDatas.push(state.userInput);
      state.userInput = '';
      state.koreanBuffer = '';
      if (state.cursor < state.datas.length)
        state.cursor ++;
      if (state.cursor === state.datas.length) {
        state.level ++;
        state.fetchStatus = 'idle';
      }
    },
    switchLanguage(state) {
      state.fetchStatus = 'idle';
      state.level = 1;
      state.cursor = 0;
      state.userInput = '';
      state.datas = [];
      state.typedDatas = [];
      state.koreanBuffer = '';
    },
  },
  extraReducers: {
    [fetchKeys.fulfilled]: (state, action) => {
      state.fetchStatus = 'succeeded';
      state.datas = action.payload;
      state.typedDatas = [];
      state.cursor = 0;
    },
  }
});

export default keysSlice.reducer;

export const { keyPressed, switchLanguage } = keysSlice.actions;

export const selectKeys = (state) => state.keys;

export const selectFetchStatus = (state) => state.keys.fetchStatus;

export const selectUserInput = createSelector(
  [selectKeys],
  (keys) => keys.userInput + inko.en2ko(keys.koreanBuffer)
);

export const selectCursorKey = createSelector(
  [selectKeys],
  (keys) => {
    return keys.datas[keys.cursor];
  }
);

export const selectPreviousKeys = createSelector(
  [selectKeys],
  (keys) => {
    const l = Math.max(0, keys.cursor - 2);
    return keys.datas.slice(l, keys.cursor);
  }
);

export const selectPreviousTypedKeys = createSelector(
  [selectKeys],
  (keys) => {
    const l = Math.max(0, keys.cursor - 2);
    return keys.typedDatas.slice(l, keys.cursor);
  }
);

export const selectNextKeys = createSelector(
  [selectKeys],
  (keys) => {
    const l = Math.min(keys.cursor + 1, keys.datas.length);
    const r = Math.min(keys.datas.length, keys.cursor + 3)
    return keys.datas.slice(l, r);
  }
);

export const selectProgressPercent = (state) => {
  return Math.round(
    100 * state.keys.cursor / (state.keys.datas.length || 1)
  );
};

export const selectWrongCount = (state) => {
  const { typedDatas, datas } = state.keys;
  let count = 0;
  for (let i = 0; i < typedDatas.length; i++) {
    const shouldBe = datas[i];
    const typed = typedDatas[i].trim();
    const r = Math.max(shouldBe.length, typed.length);
    for (let j = 0; j < r; j++) {
      if (shouldBe[j] !== typed[j]) count ++;
    }
  }
  return count; 
}

export const selectAccuracy = (state) => {
  const wrongCount = selectWrongCount(state);
  const { datas, cursor } = state.keys;
  const textLen = datas
    .slice(0, cursor)
    .reduce((acc, text) => acc + text.length, 0) || 1;
  const accuracy = 100 * (textLen - wrongCount) / textLen;
  
  return Math.round(accuracy);
}
