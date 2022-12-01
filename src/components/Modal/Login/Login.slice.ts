import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    initializeLogin: () => initialState,
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    loginError: (state) => {
      state.isLogin = false;
    },
  },
});

export const { initializeLogin, loginSuccess, loginError } = slice.actions;

export default slice.reducer;
