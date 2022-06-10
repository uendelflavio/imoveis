import API from '../utils/api';
import { URL_SESSION_REFRESH, URL_SESSION_NEW } from '../constants/urls';
//import { getToken } from '../utils/auth';

const post_new = (params) => {
    return API.post(URL_SESSION_NEW, params, { headers: { 'Content-Type': 'application/json' } });
};

const post_refresh = (params) => {
    return API.post(URL_SESSION_REFRESH, params, { headers: { 'Content-Type': 'application/json' } });
};
const LoginService = {
    post_new,
    post_refresh
};

export default LoginService;