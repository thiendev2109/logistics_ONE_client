import axios from "axios";
import paymentSlice from "../redux/slice/paymentSlice";

export const createPayment = async (token, data, dispatch, navigate) => {
  dispatch(paymentSlice.actions.createPaymentStart());
  try {
    await axios.post("http://localhost:8080/api/payment", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(paymentSlice.actions.createPaymentSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(paymentSlice.actions.createPaymentFailed());
  }
};

export const getPayments = async (accessToken, dispatch) => {
  dispatch(paymentSlice.actions.getPaymentStart());
  try {
    const response = await axios.get("http://localhost:8080/api/payment", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(paymentSlice.actions.getPaymentSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(paymentSlice.actions.getPaymentFailed());
  }
};

export const deletePayment = async (accessToken, dispatch, id) => {
  dispatch(paymentSlice.actions.deletePaymentStart());
  try {
    await axios.delete(`http://localhost:8080/api/payment/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(paymentSlice.actions.deletePaymentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(paymentSlice.actions.deletePaymentFailed());
  }
};

export const updatePayment = async (data, accessToken, dispatch, id) => {
  dispatch(paymentSlice.actions.updatePaymentStart());
  try {
    await axios.put(`http://localhost:8080/api/payment/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(paymentSlice.actions.updatePaymentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(paymentSlice.actions.updatePaymentFailed());
  }
};
