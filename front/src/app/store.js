import { configureStore } from '@reduxjs/toolkit'
import keyboardsReducer from '../features/keyboards/KeyboardsSlice';
import wordsReducer from '../features/practices/words/wordsSlice';
import keysReducer from '../features/practices/keys/keysSlice';

export default configureStore({
  reducer: {
    keyboards: keyboardsReducer,
    words: wordsReducer,
    keys: keysReducer,
  }
});
