import { TOKEN_KEY, TOKEN_USER, TOKEN_REFRESH } from '../constants/auth-constants'

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
const getUser = () => sessionStorage.getItem(TOKEN_USER);
const setUser = user => sessionStorage.setItem(TOKEN_USER, user);


const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = token => localStorage.setItem(TOKEN_KEY, token);
const getRefreshToken = () => localStorage.getItem(TOKEN_REFRESH);
const setRefreshToken = token => localStorage.setItem(TOKEN_REFRESH, token);

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_REFRESH);
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
    isAuthenticated
};

export default TokenService;