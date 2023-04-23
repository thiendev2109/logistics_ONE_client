import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shippings: {
      allShippings: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createShippingStart: (state) => {
      state.shippings.isFetching = true;
      state.shippings.allShippings = null;
      state.shippings.message = "Loading";
    },
    createShippingSuccess: (state, action) => {
      state.shippings.isFetching = false;
      state.shippings.error = false;
      state.shippings.message = "Create new shipping Success";
    },
    createShippingFailed: (state, action) => {
      state.shippings.isFetching = false;
      state.shippings.error = true;
      state.shippings.message = "Somethings went wrong";
    },

    getShippingStart: (state) => {
      state.shippings.isFetching = true;
      state.shippings.allShippings = null;
      state.shippings.message = "Loading";
    },
    getShippingSuccess: (state, action) => {
      state.shippings.isFetching = false;
      state.shippings.allShippings = action.payload;
      state.shippings.error = false;
      state.shippings.message = "Success";
    },
    getShippingFailed: (state) => {
      state.shippings.isFetching = false;
      state.shippings.error = true;
      state.shippings.message = "Somethings went wrong";
    },

    deleteShippingStart: (state) => {
      state.shippings.isFetching = true;
      state.shippings.message = "Loading";
    },
    deleteShippingSuccess: (state) => {
      state.shippings.isFetching = false;
      state.shippings.error = false;
      state.shippings.message = "Success";
    },
    deleteShippingFailed: (state) => {
      state.shippings.isFetching = false;
      state.shippings.error = true;
      state.shippings.message = "Somethings went wrong";
    },

    updateShippingStart: (state) => {
      state.shippings.isFetching = true;
      state.shippings.message = "Loading";
    },
    updateShippingSuccess: (state) => {
      state.shippings.isFetching = false;
      state.shippings.error = false;
      state.shippings.message = "Success";
    },
    updateShippingFailed: (state) => {
      state.shippings.isFetching = false;
      state.shippings.error = true;
      state.shippings.message = "Somethings went wrong";
    },
  },
});

export default shippingSlice;
