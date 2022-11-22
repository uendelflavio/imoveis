import {
  TOKEN_KEY,
  TOKEN_USER,
  TOKEN_REFRESH,
  TOKEN_COUNT
} from "constants/auth-constants";
import jwt_decode from "jwt-decode";

const IsAuthenticated = () => {
  try {
    const jwt = jwt_decode(getToken());
    const tcode = `${getUser().toString()}-${getUser().toString().length}`;
    if (jwt.aud === jwt.iss && jwt.typ === "access" && jwt.code === tcode)
      return true;
    return false;
  } catch (error) {
    return false;
  }
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = token => localStorage.setItem(TOKEN_KEY, token);

const getRefreshToken = () => localStorage.getItem(TOKEN_REFRESH);
const setRefreshToken = token => localStorage.setItem(TOKEN_REFRESH, token);

const getCount = () => parseInt(localStorage.getItem(TOKEN_COUNT));
const setCount = count => localStorage.setItem(TOKEN_COUNT, parseInt(count));

const getUser = () => sessionStorage.getItem(TOKEN_USER);
const setUser = user => sessionStorage.setItem(TOKEN_USER, user);

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_REFRESH);
  localStorage.removeItem(TOKEN_COUNT);
  sessionStorage.removeItem(TOKEN_USER);
};

const TokenService = {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
  getUser,
  setUser,
  getCount,
  setCount,
  IsAuthenticated
};

export default TokenService;
