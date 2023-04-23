import axios from "axios";
import serviceSlice from "../redux/slice/serviceSlice";

export const createService = async (token, data, dispatch, navigate) => {
  dispatch(serviceSlice.actions.createServiceStart());
  try {
    await axios.post("http://localhost:8080/api/service", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(serviceSlice.actions.createServiceSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(serviceSlice.actions.createServiceFailed());
  }
};

export const getServices = async (accessToken, dispatch) => {
  dispatch(serviceSlice.actions.getServiceStart());
  try {
    const response = await axios.get("http://localhost:8080/api/service", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(serviceSlice.actions.getServiceSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(serviceSlice.actions.getServiceFailed());
  }
};

export const deleteService = async (accessToken, dispatch, id) => {
  dispatch(serviceSlice.actions.deleteServiceStart());
  try {
    await axios.delete(`http://localhost:8080/api/service/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(serviceSlice.actions.deleteServiceSuccess());
  } catch (error) {
    console.log(error);
    dispatch(serviceSlice.actions.deleteServiceFailed());
  }
};

export const updateService = async (data, accessToken, dispatch, id) => {
  dispatch(serviceSlice.actions.updateServiceStart());
  try {
    await axios.put(`http://localhost:8080/api/service/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(serviceSlice.actions.updateServiceSuccess());
  } catch (error) {
    console.log(error);
    dispatch(serviceSlice.actions.updateServiceFailed());
  }
};
