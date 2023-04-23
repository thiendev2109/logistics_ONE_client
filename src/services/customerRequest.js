import axios from "axios";
import customerSlice from "../redux/slice/customerSlice";

export const registerCustomer = async (data, dispatch, navigate) => {
  dispatch(customerSlice.actions.registerCustomerStart());
  try {
    const response = await axios.post(
      "http://localhost:8080/api/customer",
      data
    );
    dispatch(customerSlice.actions.registerCustomerSuccess(response.data));
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(customerSlice.actions.registerCustomerFailed());
  }
};

export const getCustomers = async (accessToken, dispatch) => {
  dispatch(customerSlice.actions.getCustomersStart());
  try {
    const response = await axios.get("http://localhost:8080/api/customer", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(customerSlice.actions.getCustomersSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(customerSlice.actions.getCustomersFailed());
  }
};

export const deleteCustomer = async (accessToken, dispatch, id) => {
  dispatch(customerSlice.actions.deleteCustomersStart());
  try {
    await axios.delete(`http://localhost:8080/api/customer/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(customerSlice.actions.deleteCustomersSuccess());
  } catch (error) {
    console.log(error);
    dispatch(customerSlice.actions.deleteCustomersFailed());
  }
};

export const updateCustomer = async (data, accessToken, dispatch, id) => {
  dispatch(customerSlice.actions.updateCustomersStart());
  try {
    await axios.put(`http://localhost:8080/api/customer/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(customerSlice.actions.updateCustomersSuccess());
  } catch (error) {
    console.log(error);
    dispatch(customerSlice.actions.updateCustomersFailed());
  }
};
