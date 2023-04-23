import axios from "axios";
import vehicalSlice from "../redux/slice/vehicalSlice";

export const createVehical = async (token, data, dispatch, navigate) => {
  dispatch(vehicalSlice.actions.createVehicalStart());
  try {
    await axios.post("http://localhost:8080/api/vehical", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(vehicalSlice.actions.createVehicalSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(vehicalSlice.actions.createVehicalFailed());
  }
};

export const getVehicals = async (accessToken, dispatch) => {
  dispatch(vehicalSlice.actions.getVehicalsStart());
  try {
    const response = await axios.get("http://localhost:8080/api/vehical", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(vehicalSlice.actions.getVehicalsSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(vehicalSlice.actions.getVehicalsFailed());
  }
};

export const deleteVehical = async (accessToken, dispatch, id) => {
  dispatch(vehicalSlice.actions.deleteVehicalStart());
  try {
    await axios.delete(`http://localhost:8080/api/vehical/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(vehicalSlice.actions.deleteVehicalSuccess());
  } catch (error) {
    console.log(error);
    dispatch(vehicalSlice.actions.deleteVehicalFailed());
  }
};

export const updateVehical = async (data, accessToken, dispatch, id) => {
  dispatch(vehicalSlice.actions.updateVehicalStart());
  try {
    await axios.put(`http://localhost:8080/api/vehical/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(vehicalSlice.actions.updateVehicalSuccess());
  } catch (error) {
    console.log(error);
    dispatch(vehicalSlice.actions.updateVehicalFailed());
  }
};
