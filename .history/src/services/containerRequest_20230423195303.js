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
    dispatch(containerSlice.actions.getContainerSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(containerSlice.actions.getContainerFailed());
  }
};

export const deleteContainers = async (accessToken, dispatch, id) => {
  dispatch(containerSlice.actions.deleteContainerStart());
  try {
    await axios.delete(`http://localhost:8080/api/container/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(containerSlice.actions.deleteContainerSuccess());
  } catch (error) {
    console.log(error);
    dispatch(containerSlice.actions.deleteContainerFailed());
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
