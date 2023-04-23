import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: {
      allServices: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {

  createServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.allServices = null;
      state.services.message = "Loading";
    },
    createServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.services.error = false;
      state.services.message = "Create new service Success";
    },
    createServiceFailed: (state, action) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.services.message = "Somethings went wrong";
    },

    getServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.allServices = null;
      state.services.message = "Loading";
    },
    getServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.services.allServices = action.payload;
      state.services.error = false;
      state.services.message = "Success";
    },
    getServiceFailed: (state) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.services.message = "Somethings went wrong";
    },

    deleteServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.message = "Loading";
    },
    deleteServiceSuccess: (state) => {
      state.services.isFetching = false;
      state.services.error = false;
      state.services.message = "Success";
    },
    deleteServiceFailed: (state) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.services.message = "Somethings went wrong";
    },

    updateServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.message = "Loading";
    },
    updateServiceSuccess: (state) => {
      state.services.isFetching = false;
      state.services.error = false;
      state.services.message = "Success";
    },
    updateServiceFailed: (state) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.services.message = "Somethings went wrong";
    },
  },
});

export default serviceSlice;
