import axios from "axios";
// import { Redirect } from "react-router";
import { getToken } from "./auth";
const apiUrl = 'http://localhost:4000/api';


export const API = axios.create({
  baseURL: apiUrl,
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});

API.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true
  }
  return config;
});

// API.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response.status === 401) {
//     window.location = '/login';
//   }
//   if (error.response.status >= 500) {
//     window.location = '/app';
//   }
//   return error;
// });

export default API;