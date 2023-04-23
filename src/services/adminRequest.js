import axios from "axios";
import adminSlide from "../redux/slice/adminSlice";

export const createAdmin = async (token, data, dispatch, navigate) => {
  dispatch(adminSlide.actions.createAdminstart());
  try {
    await axios.post("http://localhost:8080/api/admin", data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(adminSlide.actions.createAdminSuccess());
    navigate(this);
  } catch (error) {
    console.log(error);
    dispatch(adminSlide.actions.createAdminFailed());
  }
};

export const getAdmins = async (accessToken, dispatch) => {
  dispatch(adminSlide.actions.getAdminsStart());
  try {
    const response = await axios.get("http://localhost:8080/api/admin", {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(adminSlide.actions.getAdminsSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(adminSlide.actions.getAdminsFailed());
  }
};

export const deleteAdmin = async (accessToken, dispatch, id) => {
  dispatch(adminSlide.actions.deleteAdminStart());
  try {
    await axios.delete(`http://localhost:8080/api/admin/${id}`, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(adminSlide.actions.deleteAdminStart());
  } catch (error) {
    console.log(error);
    dispatch(adminSlide.actions.deleteAdminFailed());
  }
};

export const updateAdmin = async (data, accessToken, dispatch, id) => {
  dispatch(adminSlide.actions.updateAdminStart());
  try {
    await axios.put(`http://localhost:8080/api/admin/${id}`, data, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(adminSlide.actions.updateAdminSuccess());
  } catch (error) {
    console.log(error);
    dispatch(adminSlide.actions.updateAdminFailed());
  }
};
