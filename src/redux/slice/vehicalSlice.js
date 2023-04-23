import { createSlice } from "@reduxjs/toolkit";

const vehicalSlice = createSlice({
  name: "vehical",
  initialState: {
    vehicals: {
      allVehicals: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createVehicalStart: (state) => {
      state.vehicals.isFetching = true;
      state.vehicals.allVehicals = null;
      state.vehicals.message = "Loading";
    },
    createVehicalSuccess: (state, action) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = false;
      state.vehicals.message = "Create new employee Success";
    },
    createVehicalFailed: (state, action) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = true;
      state.vehicals.message = "Somethings went wrong";
    },

    getVehicalsStart: (state) => {
      state.vehicals.isFetching = true;
      state.vehicals.allVehicals = null;
      state.vehicals.message = "Loading";
    },
    getVehicalsSuccess: (state, action) => {
      state.vehicals.isFetching = false;
      state.vehicals.allVehicals = action.payload;
      state.vehicals.error = false;
      state.vehicals.message = "Success";
    },
    getVehicalsFailed: (state) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = true;
      state.vehicals.message = "Somethings went wrong";
    },

    deleteVehicalStart: (state) => {
      state.vehicals.isFetching = true;
      state.vehicals.message = "Loading";
    },
    deleteVehicalSuccess: (state) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = false;
      state.vehicals.message = "Success";
    },
    deleteVehicalFailed: (state) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = true;
      state.vehicals.message = "Somethings went wrong";
    },

    updateVehicalStart: (state) => {
      state.vehicals.isFetching = true;
      state.vehicals.message = "Loading";
    },
    updateVehicalSuccess: (state) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = false;
      state.vehicals.message = "Success";
    },
    updateVehicalFailed: (state) => {
      state.vehicals.isFetching = false;
      state.vehicals.error = true;
      state.vehicals.message = "Somethings went wrong";
    },
  },
});

export default vehicalSlice;
