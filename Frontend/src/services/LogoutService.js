import API from '../utils/api';
import { URL_SESSION } from '../constants/urls';

const post = (params) => {
    return API.post(URL_SESSION, params)
        .then(response => response.data)
        .catch(error => error);
};

const LogoutService = {
    post,
};


export default LogoutService;