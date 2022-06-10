import API from '../utils/api';
import { URL_SESSION } from '../constants/urls';

const post = (params) => {
    return API.post(URL_SESSION, params, { headers: { 'Content-Type': 'application/json' } });
};

const LogoutService = {
    post,
};


export default LogoutService;