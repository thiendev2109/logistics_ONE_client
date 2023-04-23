import axios from "axios";
import bookingSlice from "../redux/slice/bookingSlice";

export const createBooking = async (token, data, dispatch, navigate) => {
  dispatch(bookingSlice.actions.createBookingStart());
  try {
    await axios.post("http://localhost:8080/api/booking", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(bookingSlice.actions.createBookingSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(bookingSlice.actions.createBookingFailed());
  }
};

export const getBookings = async (accessToken, dispatch) => {
  dispatch(bookingSlice.actions.getBookingStart());
  try {
    const response = await axios.get("http://localhost:8080/api/booking", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(bookingSlice.actions.getBookingSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(bookingSlice.actions.getBookingFailed());
  }
};

export const deleteBooking = async (accessToken, dispatch, id) => {
  dispatch(bookingSlice.actions.deleteBookingStart());
  try {
    await axios.delete(`http://localhost:8080/api/booking/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(bookingSlice.actions.deleteBookingSuccess());
  } catch (error) {
    console.log(error);
    dispatch(bookingSlice.actions.deleteBookingFailed());
  }
};

export const updateBooking = async (data, accessToken, dispatch, id) => {
  dispatch(bookingSlice.actions.updateBookingStart());
  try {
    await axios.put(`http://localhost:8080/api/booking/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(bookingSlice.actions.updateBookingSuccess());
  } catch (error) {
    console.log(error);
    dispatch(bookingSlice.actions.updateBookingFailed());
  }
};
