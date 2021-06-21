import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "sentence",
  initialState: {
    progressPecent: 0,
    totalCharacters: 0,
    currentCharacters: 0,
    totalWrongCharacters: 0,
    wrongCharacters: 0,
    typeCount: 0,
  },
  reducers: {
    initState: (state) => {
      state.progressPecent = 0;
      state.totalCharacters = 0;
      state.currentCharacters = 0;
      state.totalWrongCharacters = 0;
      state.wrongCharacters = 0;
      state.typeCount = 0;
    },
    incrementProgressPercent: (state, action) => {
      state.progressPecent = action.payload;
      state.totalWrongCharacters += state.wrongCharacters;
      state.wrongCharacters = 0;
      state.totalCharacters += state.currentCharacters;
      state.currentCharacters = 0;
    },
    incrementWrongCharacters: (state, action) => {
      state.wrongCharacters = action.payload;
    },
    incrementCurrentCharacters: (state, action) => {
      state.currentCharacters = action.payload;
    },
    incrementTypeCount: (state) => {
      state.typeCount += 1;
    },
  },
});
export const {
  initState,
  incrementProgressPercent,
  incrementWrongCharacters,
  incrementCurrentCharacters,
  incrementTypeCount,
} = slice.actions;

export const selectProgressPercent = (state) =>
  parseInt(state.sentence.progressPecent) + "%";
export const selectAccuracyPercent = (state) => {
  const accuracy = parseInt(
    (((state.sentence.totalCharacters + state.sentence.currentCharacters) -
      (state.sentence.totalWrongCharacters + state.sentence.wrongCharacters)) /
      (state.sentence.totalCharacters+ state.sentence.currentCharacters)) *
      100
  );
  return accuracy ? accuracy + "%" : "100%";
};
export const selectTypeCount = (state) => 
  state.sentence.typeCount;

export default slice.reducer;
