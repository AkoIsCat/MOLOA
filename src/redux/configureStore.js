import { configureStore } from '@reduxjs/toolkit';
import serverSlice from './modules/serverSlice';

const store = configureStore({
  reducer: {
    server: serverSlice.reducer,
  },
});

export default store;
