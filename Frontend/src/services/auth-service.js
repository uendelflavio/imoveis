import API from '../utils/api'
import { URL_SESSION_REFRESH, URL_SESSION_NEW, URL_SESSION_DELETE } from '../constants/url-constants';
import TokenService from '../services/token-service';

const register = async (username, email, password) => {
    return await API.post(URL_SESSION_NEW, { username, email, password }, { withCredentials: false })
        .then(response => response.data.access_token)
        .catch(error => error);
};

const login = async (params) => {
    return await API.post(URL_SESSION_NEW, params, { withCredentials: false })
        .then(response => response.data.access_token)
        .catch(error => error);
};

const logout = (params) => {
    TokenService.removeToken()
    return API.delete(URL_SESSION_DELETE, params)
        .then(response => response.data.access_token)
        .catch(error => error);
};

const refresh = async () => {
    return await API.post(URL_SESSION_REFRESH, {}, { withCredentials: true })
        .then(response => response.data.access_token)
        .catch(error => error);

};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    refresh,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;