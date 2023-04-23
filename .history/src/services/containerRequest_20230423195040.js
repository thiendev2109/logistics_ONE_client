import axios from "axios";
import containerSlice from "../redux/slice/containerSlice";

export const createContainer = async (token, data, dispatch, navigate) => {
  dispatch(containerSlice.actions.createContainerStart());
  try {
    await axios.post("http://localhost:8080/api/container", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(containerSlice.actions.createContainerSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(containerSlice.actions.createContainerFailed());
  }
};

export const getContainers = async (accessToken, dispatch) => {
  dispatch(containerSlice.actions.getContainerStart());
  try {
    const response = await axios.get("http://localhost:8080/api/container", {
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
