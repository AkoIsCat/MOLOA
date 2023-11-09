import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  engraving1: undefined,
  engraving2: undefined,
};

const jobEngravingSlice = createSlice({
  name: 'jobEngraving',
  initialState,
  reducers: {
    SELECT_ENGRAVING1: (state, action) => {
      return {
        ...state,
        engraving1:
          state.engraving1 !== action.payload.engraving
            ? action.payload.engraving
            : undefined,
      };
    },
    SELECT_ENGRAVING2: (state, action) => {
      return {
        ...state,
        engraving2:
          state.engraving2 !== action.payload.engraving
            ? action.payload.engraving
            : undefined,
      };
    },
    INITIAL_ENGRAVINGS: () => {
      return initialState;
    },
  },
});

export const { SELECT_ENGRAVING1 } = jobEngravingSlice.actions;
export const { SELECT_ENGRAVING2 } = jobEngravingSlice.actions;
export const { INITIAL_ENGRAVINGS } = jobEngravingSlice.actions;

export default jobEngravingSlice;
