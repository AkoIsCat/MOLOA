import { configureStore } from '@reduxjs/toolkit';
import serverSlice from './modules/serverSlice';
import classSlice from './modules/classSlice';
import jobEngravingSlice from './modules/jobEngravingSlice';
import guildSlice from './modules/guildSlice';

const store = configureStore({
  reducer: {
    server: serverSlice.reducer,
    class: classSlice.reducer,
    jobEngraving: jobEngravingSlice.reducer,
    guild: guildSlice.reducer,
  },
});

export default store;
