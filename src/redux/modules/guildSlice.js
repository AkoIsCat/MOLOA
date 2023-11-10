import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  server: undefined,
  serverNumber: undefined,
};

const guildSlice = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    SELECT_GUILD: (state, action) => {
      return {
        ...state,
        server:
          state.server !== action.payload.server
            ? action.payload.server
            : undefined,
        serverNumber:
          state.serverNumber !== action.payload.number
            ? action.payload.number
            : undefined,
      };
    },
  },
});

export const { SELECT_GUILD } = guildSlice.actions;

export default guildSlice;
