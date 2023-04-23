import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouses: {
      allWarehouses: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createWarehouseStart: (state) => {
      state.warehouses.isFetching = true;
      state.warehouses.allWarehouses = null;
      state.warehouses.message = "Loading";
    },
    createWarehouseSuccess: (state, action) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = false;
      state.warehouses.message = "Create new warehouse Success";
    },
    createWarehouseFailed: (state, action) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = true;
      state.warehouses.message = "Somethings went wrong";
    },

    getWarehouseStart: (state) => {
      state.warehouses.isFetching = true;
      state.warehouses.allWarehouses = null;
      state.warehouses.message = "Loading";
    },
    getWarehouseSuccess: (state, action) => {
      state.warehouses.isFetching = false;
      state.warehouses.allWarehouses = action.payload;
      state.warehouses.error = false;
      state.warehouses.message = "Success";
    },
    getWarehouseFailed: (state) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = true;
      state.warehouses.message = "Somethings went wrong";
    },

    deleteWarehouseStart: (state) => {
      state.warehouses.isFetching = true;
      state.warehouses.message = "Loading";
    },
    deleteWarehouseSuccess: (state) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = false;
      state.warehouses.message = "Success";
    },
    deleteWarehouseFailed: (state) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = true;
      state.warehouses.message = "Somethings went wrong";
    },

    updateWarehouseStart: (state) => {
      state.warehouses.isFetching = true;
      state.warehouses.message = "Loading";
    },
    updateWarehouseSuccess: (state) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = false;
      state.warehouses.message = "Success";
    },
    updateWarehouseFailed: (state) => {
      state.warehouses.isFetching = false;
      state.warehouses.error = true;
      state.warehouses.message = "Somethings went wrong";
    },
  },
});

export default warehouseSlice;
