import { createSlice } from "@reduxjs/toolkit";

const employeeTypeSlice = createSlice({
  name: "employeeType",
  initialState: {
    employeeTypes: {
      allTypes: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createEmployeeTypeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.allTypes = null;
      state.employees.message = "Loading";
    },
    createEmployeeTypeSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Create new employee Success";
    },
    createEmployeeTypeFailed: (state, action) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    getEmployeeTypesStart: (state) => {
      state.employees.isFetching = true;
      state.employees.allTypes = null;
      state.employees.message = "Loading";
    },
    getEmployeeTypesSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.allTypes = action.payload;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    getEmployeeTypesFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    deleteEmployeeTypeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.message = "Loading";
    },
    deleteEmployeeTypeSuccess: (state) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    deleteEmployeeTypeFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    updateEmployeeTypeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.message = "Loading";
    },
    updateEmployeeTypeSuccess: (state) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    updateEmployeeTypeFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },
  },
});

export default employeeTypeSlice;
