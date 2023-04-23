import { createSlice } from "@reduxjs/toolkit";

const merchandiseSlice = createSlice({
  name: "merchandise",
  initialState: {
    merchandises: {
      allMerchandises: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {

  createMerchandiseStart: (state) => {
      state.merchandises.isFetching = true;
      state.merchandises.allMerchandises = null;
      state.merchandises.message = "Loading";
    },
    createMerchandiseSuccess: (state, action) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = false;
      state.merchandises.message = "Create new Merchandise Success";
    },
    createMerchandiseFailed: (state, action) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = true;
      state.merchandises.message = "Somethings went wrong";
    },

    getMerchandiseStart: (state) => {
      state.merchandises.isFetching = true;
      state.merchandises.allMerchandises = null;
      state.merchandises.message = "Loading";
    },
    getMerchandiseSuccess: (state, action) => {
      state.merchandises.isFetching = false;
      state.merchandises.allMerchandises = action.payload;
      state.merchandises.error = false;
      state.merchandises.message = "Success";
    },
    getMerchandiseFailed: (state) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = true;
      state.merchandises.message = "Somethings went wrong";
    },

    deleteMerchandiseStart: (state) => {
      state.merchandises.isFetching = true;
      state.merchandises.message = "Loading";
    },
    deleteMerchandiseSuccess: (state) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = false;
      state.merchandises.message = "Success";
    },
    deleteMerchandiseFailed: (state) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = true;
      state.merchandises.message = "Somethings went wrong";
    },

    updateMerchandiseStart: (state) => {
      state.merchandises.isFetching = true;
      state.merchandises.message = "Loading";
    },
    updateMerchandiseSuccess: (state) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = false;
      state.merchandises.message = "Success";
    },
    updateMerchandiseFailed: (state) => {
      state.merchandises.isFetching = false;
      state.merchandises.error = true;
      state.merchandises.message = "Somethings went wrong";
    },
  },
});

export default merchandiseSlice;
