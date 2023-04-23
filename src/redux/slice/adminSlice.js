import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: {
      allAdmins: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createAdminStart: (state) => {
      state.admins.isFetching = true;
      state.admins.allAdmins = null;
      state.admins.message = "Loading";
    },
    createAdminSuccess: (state, action) => {
      state.admins.isFetching = false;
      state.admins.error = false;
      state.admins.message = "Create new admin Success";
    },
    createAdminFailed: (state, action) => {
      state.admins.isFetching = false;
      state.admins.error = true;
      state.admins.message = "Somethings went wrong";
    },

    getAdminsStart: (state) => {
      state.admins.isFetching = true;
      state.admins.allAdmins = null;
      state.admins.message = "Loading";
    },
    getAdminsSuccess: (state, action) => {
      state.admins.isFetching = false;
      state.admins.allAdmins = action.payload;
      state.admins.error = false;
      state.admins.message = "Success";
    },
    getAdminsFailed: (state) => {
      state.admins.isFetching = false;
      state.admins.error = true;
      state.admins.message = "Somethings went wrong";
    },

    deleteAdminStart: (state) => {
      state.admins.isFetching = true;
      state.admins.message = "Loading";
    },
    deleteAdminSuccess: (state) => {
      state.admins.isFetching = false;
      state.admins.error = false;
      state.admins.message = "Success";
    },
    deleteAdminFailed: (state) => {
      state.admins.isFetching = false;
      state.admins.error = true;
      state.admins.message = "Somethings went wrong";
    },

    updateAdminStart: (state) => {
      state.admins.isFetching = true;
      state.admins.message = "Loading";
    },
    updateAdminSuccess: (state) => {
      state.admins.isFetching = false;
      state.admins.error = false;
      state.admins.message = "Success";
    },
    updateAdminFailed: (state) => {
      state.admins.isFetching = false;
      state.admins.error = true;
      state.admins.message = "Somethings went wrong";
    },
  },
});

export default adminSlice;
