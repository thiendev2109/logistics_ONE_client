import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: {
      allEmployees: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createEmployeeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.allEmployees = null;
      state.employees.message = "Loading";
    },
    createEmployeeSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Create new employee Success";
    },
    createEmployeeFailed: (state, action) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    getEmployeesStart: (state) => {
      state.employees.isFetching = true;
      state.employees.allEmployees = null;
      state.employees.message = "Loading";
    },
    getEmployeesSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.allEmployees = action.payload;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    getEmployeesFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    deleteEmployeeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.message = "Loading";
    },
    deleteEmployeeSuccess: (state) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    deleteEmployeeFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },

    updateEmployeeStart: (state) => {
      state.employees.isFetching = true;
      state.employees.message = "Loading";
    },
    updateEmployeeSuccess: (state) => {
      state.employees.isFetching = false;
      state.employees.error = false;
      state.employees.message = "Success";
    },
    updateEmployeeFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
      state.employees.message = "Somethings went wrong";
    },
  },
});

export default employeeSlice;
