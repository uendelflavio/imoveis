import API from '../utils/api';
import { URL_SESSION_REFRESH, URL_SESSION_NEW } from '../constants/urls';


const post_new = (params) => {
    return API.post(URL_SESSION_NEW, params, { withCredentials: false });
};

const post_refresh = (params) => {
    return API.post(URL_SESSION_REFRESH, params);
};
const LoginService = {
    post_new,
    post_refresh
};

export default LoginService;