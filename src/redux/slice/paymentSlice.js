import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: {
      allPayments: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createPaymentStart: (state) => {
      state.payments.isFetching = true;
      state.payments.allPayments = null;
      state.payments.message = "Loading";
    },
    createPaymentSuccess: (state, action) => {
      state.payments.isFetching = false;
      state.payments.error = false;
      state.payments.message = "Create new payment Success";
    },
    createPaymentFailed: (state, action) => {
      state.payments.isFetching = false;
      state.payments.error = true;
      state.payments.message = "Somethings went wrong";
    },

    getPaymentStart: (state) => {
      state.payments.isFetching = true;
      state.payments.allPayments = null;
      state.payments.message = "Loading";
    },
    getPaymentSuccess: (state, action) => {
      state.payments.isFetching = false;
      state.payments.allPayments = action.payload;
      state.payments.error = false;
      state.payments.message = "Success";
    },
    getPaymentFailed: (state) => {
      state.payments.isFetching = false;
      state.payments.error = true;
      state.payments.message = "Somethings went wrong";
    },

    deletePaymentStart: (state) => {
      state.payments.isFetching = true;
      state.payments.message = "Loading";
    },
    deletePaymentSuccess: (state) => {
      state.payments.isFetching = false;
      state.payments.error = false;
      state.payments.message = "Success";
    },
    deletePaymentFailed: (state) => {
      state.payments.isFetching = false;
      state.payments.error = true;
      state.payments.message = "Somethings went wrong";
    },

    updatePaymentStart: (state) => {
      state.payments.isFetching = true;
      state.payments.message = "Loading";
    },
    updatePaymentSuccess: (state) => {
      state.payments.isFetching = false;
      state.payments.error = false;
      state.payments.message = "Success";
    },
    updatePaymentFailed: (state) => {
      state.payments.isFetching = false;
      state.payments.error = true;
      state.payments.message = "Somethings went wrong";
    },
  },
});

export default paymentSlice;
