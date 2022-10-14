import axios from "axios";
import TokenService from '../services/token-service';
import { URL_SESSION_REFRESH } from '../constants/url-constants';
import { URL_BASE } from '../constants/url-constants';

// implementacao completa no site https://www.bezkoder.com/axios-interceptors-refresh-token/
// https://www.bezkoder.com/react-refresh-token/
export const API = axios.create({
  baseURL: URL_BASE,
  timeout: 4000,
  withCredentials: true,
  headers: { "Content-type": "application/json;charset=utf-8" }
});

API.interceptors.request.use(
  async config => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true
    }
    return config;
  },
  error => Promise.reject(error)
);


API.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response.status === 401) {

    const token = TokenService.getRefreshToken();
    if (token) {
      TokenService.setToken(token);
      const token_refresh = await API.post(URL_SESSION_REFRESH, {}, { withCredentials: true })
        .then(response => response.data.access_token)
        .catch(error => error);
      TokenService.setRefreshToken(token_refresh)
      window.location = '/app';

    } else {
      window.location = '/login';
    }

  }
  if (error.response.status >= 500) {
    window.location = '/app';
  }
  return error;
});




export default API;