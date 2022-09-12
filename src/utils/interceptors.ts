import axios from 'axios';
import {registerUser} from '../hooks/useRegister';

// request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') ?? '';
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        // eslint-disable-next-line camelcase
        client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
      };
    } else {
      config.params = {
        ...config.params,
        // eslint-disable-next-line camelcase
        sl_token: JSON.parse(token),
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const user = JSON.parse(localStorage.getItem('user') ?? '');

    if (error.response.status === 500 && user !== '') {
      registerUser(user.name, user.email).then((response) => {
        localStorage.setItem('token', JSON.stringify(response.sl_token));
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
