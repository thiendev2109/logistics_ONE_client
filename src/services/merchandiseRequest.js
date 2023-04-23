import axios from "axios";
import merchandiseSlice from "../redux/slice/merchandiseSlice";

export const createMerchandise = async (token, data, dispatch, navigate) => {
  dispatch(merchandiseSlice.actions.createMerchandiseStart());
  try {
    await axios.post("http://localhost:8080/api/merchandise", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(merchandiseSlice.actions.createMerchandiseSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(merchandiseSlice.actions.createMerchandiseFailed());
  }
};

export const getMerchandises = async (accessToken, dispatch) => {
  dispatch(merchandiseSlice.actions.getMerchandiseStart());
  try {
    const response = await axios.get("http://localhost:8080/api/merchandise", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(merchandiseSlice.actions.getMerchandiseSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(merchandiseSlice.actions.getMerchandiseFailed());
  }
};

export const deleteMerchandise = async (accessToken, dispatch, id) => {
  dispatch(merchandiseSlice.actions.deleteMerchandiseStart());
  try {
    await axios.delete(`http://localhost:8080/api/merchandise/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(merchandiseSlice.actions.deleteMerchandiseSuccess());
  } catch (error) {
    console.log(error);
    dispatch(merchandiseSlice.actions.deleteMerchandiseFailed());
  }
};

export const updateMerchandise = async (data, accessToken, dispatch, id) => {
  dispatch(merchandiseSlice.actions.updateMerchandiseStart());
  try {
    await axios.put(`http://localhost:8080/api/merchandise/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(merchandiseSlice.actions.updateMerchandiseSuccess());
  } catch (error) {
    console.log(error);
    dispatch(merchandiseSlice.actions.updateMerchandiseFailed());
  }
};
