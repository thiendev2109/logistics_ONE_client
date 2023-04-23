import { createSlice } from "@reduxjs/toolkit";

const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState: {
    login: {
      currentAccount: null,
      isFetching: false,
      error: false,
      message: null,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
      state.login.currentAccount = null;
      state.login.message = "Loading";
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentAccount = action.payload;
      state.login.error = false;
      state.login.message = "Login Success";
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.message = "Invalid email or password";
    },

    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentAccount = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export default authAdminSlice;
