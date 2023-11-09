import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  class: '전체',
  classNumber: undefined,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    SELECT_CLASS: (state, action) => {
      return {
        ...state,
        class:
          state.class !== action.payload.class ? action.payload.class : '전체',
        classNumber:
          state.classNumber !== action.payload.classNumber
            ? action.payload.classNumber
            : undefined,
      };
    },
    INITIAL_CLASS: () => {
      return initialState;
    },
  },
});

export const { SELECT_CLASS } = classSlice.actions;

export default classSlice;
