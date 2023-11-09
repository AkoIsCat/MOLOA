import { configureStore } from '@reduxjs/toolkit';
import serverSlice from './modules/serverSlice';
import classSlice from './modules/classSlice';
import jobEngravingSlice from './modules/jobEngravingSlice';

const store = configureStore({
  reducer: {
    server: serverSlice.reducer,
    class: classSlice.reducer,
    jobEngraving: jobEngravingSlice.reducer,
  },
});

export default store;
