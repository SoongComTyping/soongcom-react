import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "sentence",
  initialState: {
    value: 0,
    progressPecent: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    incrementProgressPercent: (state, action) => {
      state.progressPecent = action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount, incrementProgressPercent } = slice.actions;
export const selectCount = (state) => state.sentence.value;
export const selectProgressPercent = (state) => parseInt(state.sentence.progressPecent)+"%";
export default slice.reducer;
