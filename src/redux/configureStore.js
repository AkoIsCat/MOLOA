import { configureStore } from '@reduxjs/toolkit';
import serverSlice from './modules/serverSlice';
import classSlice from './modules/classSlice';

const store = configureStore({
  reducer: {
    server: serverSlice.reducer,
    class: classSlice.reducer,
  },
});

export default store;
