import axios from "axios";
import { getToken } from "./auth";
const apiUrl = 'http://localhost:4000/api';

axios.defaults.withCredentials = true;
export const API = axios.create({
  baseURL: apiUrl,
  timeout: 3000,
});

API.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;