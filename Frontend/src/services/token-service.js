import { TOKEN_KEY, TOKEN_USER, TOKEN_USER_ID, TOKEN_REFRESH } from 'constants/auth-constants'
import jwt_decode from "jwt-decode";

const IsAuthenticated = () => {
    try {
        const jwt = jwt_decode(getToken());
        const tcode = `${getUser().toString()}-${getUser().toString().length}`
        if ((jwt.aud === jwt.iss) && (jwt.typ === 'access') && (jwt.code === tcode)) return true
        return false
    } catch (error) {
        return false
    }
}


const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = token => localStorage.setItem(TOKEN_KEY, token);

const getUser = () => sessionStorage.getItem(TOKEN_USER);
const setUser = user => sessionStorage.setItem(TOKEN_USER, user);

const getUserID = () => sessionStorage.getItem(TOKEN_USER_ID);
const setUserID = id => sessionStorage.setItem(TOKEN_USER_ID, id);

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
    getUserID,
    setUserID,
    IsAuthenticated
};

export default TokenService;