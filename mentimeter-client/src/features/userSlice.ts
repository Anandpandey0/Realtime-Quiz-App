import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInStatus: false,
  user: null,
};
// const initialState = {
//   counter: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.counter++;
//     },
//     decrement: (state) => {
//       state.counter--;
//     },
//     addBy: (state, action) => {
//       state.counter += action.payload;
//     },
//   },
// });
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.loggedInStatus = true;
      state.user = action.payload;
    },
    login: (state, action) => {
      state.loggedInStatus = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedInStatus = false;
      state.user = null;
    },
  },
});

export const { setUserInfo, login, logout } = userSlice.actions;

export default userSlice.reducer;
