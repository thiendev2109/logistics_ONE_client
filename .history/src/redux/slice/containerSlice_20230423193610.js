import { createSlice } from "@reduxjs/toolkit";

const containerSlice = createSlice({
  name: "container",
  initialState: {
    containers: {
      allContainers: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {

  createContainerStart: (state) => {
      state.containers.isFetching = true;
      state.containers.allContainers = null;
      state.containers.message = "Loading";
    },
    createContainerSuccess: (state, action) => {
      state.containers.isFetching = false;
      state.containers.error = false;
      state.containers.message = "Create new container Success";
    },
    createContainerFailed: (state, action) => {
      state.containers.isFetching = false;
      state.containers.error = true;
      state.containers.message = "Somethings went wrong";
    },

    getContainerStart: (state) => {
      state.containers.isFetching = true;
      state.containers.allContainers = null;
      state.containers.message = "Loading";
    },
    getContainerSuccess: (state, action) => {
      state.containers.isFetching = false;
      state.containers.allContainers = action.payload;
      state.containers.error = false;
      state.containers.message = "Success";
    },
    getContainerFailed: (state) => {
      state.containers.isFetching = false;
      state.containers.error = true;
      state.containers.message = "Somethings went wrong";
    },

    deleteContainerStart: (state) => {
      state.containers.isFetching = true;
      state.containers.message = "Loading";
    },
    deleteContainerSuccess: (state) => {
      state.containers.isFetching = false;
      state.containers.error = false;
      state.containers.message = "Success";
    },
    deleteContainerFailed: (state) => {
      state.containers.isFetching = false;
      state.containers.error = true;
      state.containers.message = "Somethings went wrong";
    },

    updateContainerStart: (state) => {
      state.containers.isFetching = true;
      state.containers.message = "Loading";
    },
    updateContainerSuccess: (state) => {
      state.containers.isFetching = false;
      state.containers.error = false;
      state.containers.message = "Success";
    },
    updateContainerFailed: (state) => {
      state.containers.isFetching = false;
      state.containers.error = true;
      state.containers.message = "Somethings went wrong";
    },
  },
});

export default customerSlice;
