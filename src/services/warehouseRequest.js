import axios from "axios";
import warehouseSlice from "../redux/slice/warehouseSlice";

export const createWarehouse = async (token, data, dispatch, navigate) => {
  dispatch(warehouseSlice.actions.createWarehouseStart());
  try {
    await axios.post("http://localhost:8080/api/warehouse", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(warehouseSlice.actions.createWarehouseSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(warehouseSlice.actions.createWarehouseFailed());
  }
};

export const getWarehouses = async (accessToken, dispatch) => {
  dispatch(warehouseSlice.actions.getWarehouseStart());
  try {
    const response = await axios.get("http://localhost:8080/api/warehouse", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(warehouseSlice.actions.getWarehouseSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(warehouseSlice.actions.getWarehouseFailed());
  }
};

export const deleteWarehouse = async (accessToken, dispatch, id) => {
  dispatch(warehouseSlice.actions.deleteWarehouseStart());
  try {
    await axios.delete(`http://localhost:8080/api/warehouse/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(warehouseSlice.actions.deleteWarehouseSuccess());
  } catch (error) {
    console.log(error);
    dispatch(warehouseSlice.actions.deleteWarehouseFailed());
  }
};

export const updateWarehouse = async (data, accessToken, dispatch, id) => {
  dispatch(warehouseSlice.actions.updateWarehouseStart());
  try {
    await axios.put(`http://localhost:8080/api/warehouse/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(warehouseSlice.actions.updateWarehouseSuccess());
  } catch (error) {
    console.log(error);
    dispatch(warehouseSlice.actions.updateWarehouseFailed());
  }
};
