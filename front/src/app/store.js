import { configureStore } from '@reduxjs/toolkit'
import keyboardsReducer from '../features/keyboards/KeyboardsSlice';
import wordsReducer from '../features/practices/words/wordsSlice';

export default configureStore({
  reducer: {
    keyboards: keyboardsReducer,
    words: wordsReducer,
  }
});
