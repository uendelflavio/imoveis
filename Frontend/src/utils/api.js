import axios from "axios";
import TokenService from 'services/token-service';
import AuthService from "services/auth-service";
import { URL_SESSION_REFRESH, URL_BASE } from 'constants/url-constants';
// import * as AxiosLogger from 'axios-logger';

// implementacao completa no site https://www.bezkoder.com/axios-interceptors-refresh-token/
// https://www.bezkoder.com/react-refresh-token/
export const API = axios.create({
  baseURL: URL_BASE,
  timeout: 4000,
  withCredentials: true,
  headers: { "Content-type": "application/json;charset=utf-8" }
});
// habilita debug no axios
// API.interceptors.request.use((request) => {
//   return AxiosLogger.requestLogger(request);
// });

// API.interceptors.response.use((response) => {
//   return AxiosLogger.responseLogger(response);
// });

// API.interceptors.response.use(AxiosLogger.responseLogger, (err) => {
//   return AxiosLogger.errorLogger(err);
// });

API.interceptors.request
  .use(
    async config => {
      const token = TokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true
      }
      return config;
    },
    error => {
      Promise.reject(error)
    }
  );


API.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response.status === 401) {
    const token = TokenService.getRefreshToken();
    if (token) {
      TokenService.setToken(token);
      await AuthService.refresh()
        .then(response => window.location = '/app')
        .catch(error => window.location = '/login');
    }
  }
  if (error.response.status >= 500) window.location = '/';
  return error;
});

export default API;