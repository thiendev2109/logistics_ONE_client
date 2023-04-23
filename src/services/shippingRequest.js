import axios from "axios";
import shippingSlice from "../redux/slice/shippingSlice";

export const createShipping = async (token, data, dispatch, navigate) => {
  dispatch(shippingSlice.actions.createShippingStart());
  try {
    await axios.post("http://localhost:8080/api/shipping", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(shippingSlice.actions.createShippingSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(shippingSlice.actions.createShippingFailed());
  }
};

export const getShippings = async (accessToken, dispatch) => {
  dispatch(shippingSlice.actions.getShippingStart());
  try {
    const response = await axios.get("http://localhost:8080/api/shipping", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(shippingSlice.actions.getShippingSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(shippingSlice.actions.getShippingFailed());
  }
};

export const deleteShipping = async (accessToken, dispatch, id) => {
  dispatch(shippingSlice.actions.deleteShippingStart());
  try {
    await axios.delete(`http://localhost:8080/api/shipping/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(shippingSlice.actions.deleteShippingSuccess());
  } catch (error) {
    console.log(error);
    dispatch(shippingSlice.actions.deleteShippingFailed());
  }
};

export const updateShipping = async (data, accessToken, dispatch, id) => {
  dispatch(shippingSlice.actions.updateShippingStart());
  try {
    await axios.put(`http://localhost:8080/api/shipping/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(shippingSlice.actions.updateShippingSuccess());
  } catch (error) {
    console.log(error);
    dispatch(shippingSlice.actions.updateshippingFailed());
  }
};
