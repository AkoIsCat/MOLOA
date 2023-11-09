// Ducks Pattern
// 리듀서 함수를 default export해야 한다.
// 액션 생성 함수를 export해야 한다.
// 접두사를 붙인 형태로 액션 타입을 정의해야 한다.
// 외부 리듀서가 모듈 내 액션 타입을 바라보고 있거나,
// 모듈이 재사용 가능한 라이브러리로 쓰이는 것이라면 액션 타입을 UPPER_SNAKE_CASE 형태로 이름 짓고 export 하면 된다.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  server: '전체',
  serverNumber: undefined,
};

// createSlice = createAction 과 createReducer의 결합.
const serverSlice = createSlice({
  name: 'serverList',
  initialState,
  reducers: {
    SELECT_SERVER: (state, action) => {
      return {
        ...state,
        server:
          state.server !== action.payload.server
            ? action.payload.server
            : '전체',
        serverNumber:
          state.serverNumber !== action.payload.serverNumber
            ? action.payload.serverNumber
            : undefined,
      };
    },
    INITIAL_SERVER: () => {
      return initialState;
    },
  },
});

export const { SELECT_SERVER } = serverSlice.actions;
export const { INITIAL_SERVER } = serverSlice.actions;

export default serverSlice;
