import Qs from 'qs';
import axios from 'axios';
import cookie from 'js-cookie';

import * as constants from '~/utils/constants/constant';
import { isEmpty } from '~/utils/helpers/helpers';

const request = axios.create();

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 401) {
      cookie.remove(constants.TOKEN);
      window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      cookie.remove(constants.TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error.response || { data: {} });
  },
);

const api = (options: any = {}) => {
  if (!isEmpty(cookie.get(constants.TOKEN))) {
    options.headers = {
      ...options.headers,
      ['login_token']: `${cookie.get(constants.TOKEN)}`,
    };
  }
  return request({
    baseURL: 'http://localhost:8090/hufi',
    ...options,
    paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat' }),
    headers: {
      ...options.headers,
    },
  });
};

export default api;
