import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'korean',
  currentKey: '',
}

const keyboardsSlice = createSlice({
  name: 'keyboards',
  initialState,
  reducers: {
    keyPressed(state, action) {
      const { code } = action.payload;
      state.currentKey = code;
    },
    keyClear(state) {
      state.currentKey = '';
    },
    switchLanguage(state, action) {
      const { language } = action.payload;
      state.language = language;
    },
  }
});

export default keyboardsSlice.reducer;

export const { keyPressed, keyClear, switchLanguage } = keyboardsSlice.actions;

export const selectKeyboards = (state) => state.keyboards;
