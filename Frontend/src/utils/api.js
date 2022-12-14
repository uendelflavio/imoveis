import axios from "axios";
import TokenService from "services/token-service";
import { URL_BASE, URL_SESSION_REFRESH } from "constants/url-constants";
// import * as AxiosLogger from "axios-logger";

export const API = axios.create({
  baseURL: URL_BASE,
  timeout: 4000,
  withCredentials: true,
  headers: { "Content-type": "application/json;charset=utf-8" },
});

// habilita debug no axios
// API.interceptors.request.use(request => {
//   return AxiosLogger.requestLogger(request);
// });
// API.interceptors.response.use(response => {
//   return AxiosLogger.responseLogger(response);
// });
// API.interceptors.response.use(AxiosLogger.responseLogger, err => {
//   return AxiosLogger.errorLogger(err);
// });

API.interceptors.request.use(
  async (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && error.response.data.error === "invalid_token") {
      const token = TokenService.getRefreshToken();

      if (token) {
        TokenService.setToken(token);
        await API.post(URL_SESSION_REFRESH, "", { withCredentials: true })
          .then((response) => {
            TokenService.setRefreshToken(response.data.access_token);
          })
          .catch((err) => console.log(err));

        const OrigReq = new Promise((resolve, reject) => {
          const token_access = TokenService.getToken();
          originalRequest.headers["Authorization"] = `Bearer ${token_access}`;
          resolve(axios(originalRequest));
        });
        return OrigReq;
      }
      if (Number(TokenService.getCount()) === 3) {
        window.location = "/login";
        TokenService.removeToken();
      }
      TokenService.setCount(Number(TokenService.getCount()) + 1);
    } else {
      return Promise.reject(error);
    }
    if (error.response.status >= 500) window.location = "/login";
    return error;
  },
);

export default API;
