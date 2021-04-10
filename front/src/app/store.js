import { configureStore } from '@reduxjs/toolkit'
import keyboardsReducer from '../features/keyboards/KeyboardsSlice';

export default configureStore({
  reducer: {
    keyboards: keyboardsReducer,
  }
});
