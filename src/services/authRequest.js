import axios from "axios";
import authAdminSlice from "../redux/slice/authAdminSlice";

export const loginAdmin = async (account, dispatch, navigate) => {
  dispatch(authAdminSlice.actions.loginStart());
  try {
    const response = await axios.post(
      "http://localhost:8080/api/admin-login",
      account
    );
    dispatch(authAdminSlice.actions.loginSuccess(response.data));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(authAdminSlice.actions.loginFailed());
  }
};

export const logoutAdmin = async (dispatch, id, token, navigate) => {
  dispatch(authAdminSlice.actions.logoutStart());
  try {
    const res = await axios.post("http://localhost:8080/api/admin-logout", id, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(authAdminSlice.actions.loginSuccess());
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(authAdminSlice.actions.logoutFailed());
  }
};
