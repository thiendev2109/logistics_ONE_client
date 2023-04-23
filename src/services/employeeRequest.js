import axios from "axios";
import employeeSlice from "../redux/slice/employeeSlice";

export const createEmployee = async (token, data, dispatch, navigate) => {
  dispatch(employeeSlice.actions.createEmployeeStart());
  try {
    await axios.post("http://localhost:8080/api/employee", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(employeeSlice.actions.createEmployeeSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(employeeSlice.actions.createEmployeeFailed());
  }
};

export const getEmployees = async (accessToken, dispatch) => {
  dispatch(employeeSlice.actions.getEmployeesStart());
  try {
    const response = await axios.get("http://localhost:8080/api/employee", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(employeeSlice.actions.getEmployeesSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(employeeSlice.actions.getEmployeesFailed());
  }
};

export const deleteEmployee = async (accessToken, dispatch, id) => {
  dispatch(employeeSlice.actions.deleteEmployeeStart());
  try {
    await axios.delete(`http://localhost:8080/api/employee/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(employeeSlice.actions.deleteEmployeeSuccess());
  } catch (error) {
    console.log(error);
    dispatch(employeeSlice.actions.deleteEmployeeFailed());
  }
};

export const updateEmployee = async (data, accessToken, dispatch, id) => {
  dispatch(employeeSlice.actions.updateEmployeeStart());
  try {
    await axios.put(`http://localhost:8080/api/Employee/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(employeeSlice.actions.updateEmployeeSuccess());
  } catch (error) {
    console.log(error);
    dispatch(employeeSlice.actions.updateEmployeeFailed());
  }
};
