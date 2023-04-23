import { createSlice } from "@reduxjs/toolkit";

const containerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: {
      allContainers: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    registerCustomerStart: (state) => {
      state.register.isFetching = true;
      state.register.customer = null;
      state.register.message = "Loading";
    },
    registerCustomerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.customer = action.payload;
      state.register.error = false;
      state.register.message = "Login Success";
    },
    registerCustomerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.message = "Somethings went wrong";
    },

    getCustomersStart: (state) => {
      state.customers.isFetching = true;
      state.customers.customer = null;
      state.customers.message = "Loading";
    },
    getCustomersSuccess: (state, action) => {
      state.customers.isFetching = false;
      state.customers.allCustomers = action.payload;
      state.customers.error = false;
      state.customers.message = "Success";
    },
    getCustomersFailed: (state, action) => {
      state.customers.isFetching = false;
      state.customers.error = true;
      state.customers.message = "Somethings went wrong";
    },

    deleteCustomersStart: (state) => {
      state.customers.isFetching = true;
      state.customers.message = "Loading";
    },
    deleteCustomersSuccess: (state, action) => {
      state.customers.isFetching = false;
      state.customers.error = false;
      state.customers.message = "Success";
    },
    deleteCustomersFailed: (state, action) => {
      state.customers.isFetching = false;
      state.customers.error = true;
      state.customers.message = "Somethings went wrong";
    },

    updateCustomersStart: (state) => {
      state.customers.isFetching = true;
      state.customers.message = "Loading";
    },
    updateCustomersSuccess: (state, action) => {
      state.customers.isFetching = false;
      state.customers.error = false;
      state.customers.message = "Success";
    },
    updateCustomersFailed: (state, action) => {
      state.customers.isFetching = false;
      state.customers.error = true;
      state.customers.message = "Somethings went wrong";
    },
  },
});

export default customerSlice;
