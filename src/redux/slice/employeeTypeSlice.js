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
      state.employeeTypes.isFetching = true;
      state.employeeTypes.allTypes = null;
      state.employeeTypes.message = "Loading";
    },
    createEmployeeTypeSuccess: (state, action) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = false;
      state.employeeTypes.message = "Create new employee Success";
    },
    createEmployeeTypeFailed: (state, action) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = true;
      state.employeeTypes.message = "Somethings went wrong";
    },

    getEmployeeTypesStart: (state) => {
      state.employeeTypes.isFetching = true;
      state.employeeTypes.allTypes = null;
      state.employeeTypes.message = "Loading";
    },
    getEmployeeTypesSuccess: (state, action) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.allTypes = action.payload;
      state.employeeTypes.error = false;
      state.employeeTypes.message = "Success";
    },
    getEmployeeTypesFailed: (state) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = true;
      state.employeeTypes.message = "Somethings went wrong";
    },

    deleteEmployeeTypeStart: (state) => {
      state.employeeTypes.isFetching = true;
      state.employeeTypes.message = "Loading";
    },
    deleteEmployeeTypeSuccess: (state) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = false;
      state.employeeTypes.message = "Success";
    },
    deleteEmployeeTypeFailed: (state) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = true;
      state.employeeTypes.message = "Somethings went wrong";
    },

    updateEmployeeTypeStart: (state) => {
      state.employeeTypes.isFetching = true;
      state.employeeTypes.message = "Loading";
    },
    updateEmployeeTypeSuccess: (state) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = false;
      state.employeeTypes.message = "Success";
    },
    updateEmployeeTypeFailed: (state) => {
      state.employeeTypes.isFetching = false;
      state.employeeTypes.error = true;
      state.employeeTypes.message = "Somethings went wrong";
    },
  },
});

export default employeeTypeSlice;
