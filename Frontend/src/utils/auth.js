import { TOKEN_KEY, TOKEN_USER, TOKEN_PASS } from '../constants/auth-constans'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => sessionStorage.getItem(TOKEN_USER);
export const getPass = () => sessionStorage.getItem(TOKEN_PASS);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const setUser = user => {
  sessionStorage.setItem(TOKEN_USER, user);
};
export const setPass = pass => {
  sessionStorage.setItem(TOKEN_PASS, pass);
};