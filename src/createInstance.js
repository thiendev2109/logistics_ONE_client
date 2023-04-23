import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/admin-refresh",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (account, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(account?.token);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshAdmin = {
          data: account.data,
          token: data.token,
        };
        dispatch(stateSuccess(refreshAdmin));
        config.headers["Authorization"] = `Bearer ${data.token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(account?.token);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshAdmin = {
          data: account.data,
          token: data.token,
        };
        dispatch(stateSuccess(refreshAdmin));
        config.headers["Authorization"] = `Bearer ${data.token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
