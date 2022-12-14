import API from "utils/api";
import {
  URL_SESSION_DELETE,
  URL_SESSION_NEW,
  URL_SESSION_REFRESH,
} from "constants/url-constants";
import TokenService from "services/token-service";

const register = async (username, email, password) => {
  return await API.post(
    URL_SESSION_NEW,
    { username, email, password },
    { withCredentials: false },
  )
    .then((response) => response.data.access_token)
    .catch((error) => {
      return error;
    });
};

const login = async (email, password) => {
  return await API.post(
    URL_SESSION_NEW,
    { email, password },
    { withCredentials: true },
  )
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setToken(response.data.access_token);
        TokenService.setUser(email);
        refresh();
      }
      return response.data.access_token;
    })
    .catch((error) => {
      return error;
    });
};

const refresh = async () => {
  return await API.post(URL_SESSION_REFRESH, "", { withCredentials: true })
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setRefreshToken(response.data.access_token);
      }
      TokenService.setCount(0);
      return response.data.access_token;
    })
    .catch((error) => {
      return error;
    });
};

const logout = (params) => {
  return API.delete(URL_SESSION_DELETE, params)
    .then((response) => response.data.access_token)
    .catch((error) => {
      return error;
    });
};

const getCurrentUser = () => {
  if (TokenService.getToken().trim() === "") {
    TokenService.setUser("");
    TokenService.setRefreshToken("");
  } else {
    TokenService.getCurrentUser();
  }
  return JSON.parse(TokenService.getCurrentUser());
};

const getCurrentUserID = (id) => {
  if (TokenService.getToken().trim() === "") {
    TokenService.setUserID("");
  } else {
    TokenService.getCurrentUser();
  }
  return JSON.parse(TokenService.getCurrentUser());
};

const AuthService = {
  register,
  refresh,
  login,
  logout,
  getCurrentUser,
  getCurrentUserID,
};

export default AuthService;
