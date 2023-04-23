import axios from "axios";
import employeeTypeSlice from "../redux/slice/employeeTypeSlice";

export const createEmployeeType = async (token, data, dispatch, navigate) => {
  dispatch(employeeTypeSlice.actions.createEmployeeTypeStart());
  try {
    await axios.post("http://localhost:8080/api/employee-type", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(employeeTypeSlice.actions.createEmployeeTypeSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(employeeTypeSlice.actions.createEmployeeTypeFailed());
  }
};

export const getEmployeeTypes = async (accessToken, dispatch) => {
  dispatch(employeeTypeSlice.actions.getEmployeeTypesStart());
  try {
    const response = await axios.get(
      "http://localhost:8080/api/employee-type",
      {
        "Content-Type": "multipart/form-data",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(employeeTypeSlice.actions.getEmployeeTypesSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(employeeTypeSlice.actions.getEmployeeTypesFailed());
  }
};

export const deleteEmployeeType = async (accessToken, dispatch, id) => {
  console.log(id);
  dispatch(employeeTypeSlice.actions.deleteEmployeeTypeStart());
  try {
    await axios.delete(`http://localhost:8080/api/employee-type/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(employeeTypeSlice.actions.deleteEmployeeTypeSuccess());
  } catch (error) {
    console.log(error);
    dispatch(employeeTypeSlice.actions.deleteEmployeeTypeFailed());
  }
};

export const updateEmployeeType = async (data, accessToken, dispatch, id) => {
  dispatch(employeeTypeSlice.actions.updateEmployeeTypeStart());
  try {
    await axios.put(`http://localhost:8080/api/employee-type/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(employeeTypeSlice.actions.updateEmployeeTypeSuccess());
  } catch (error) {
    console.log(error);
    dispatch(employeeTypeSlice.actions.updateEmployeeTypeFailed());
  }
};
