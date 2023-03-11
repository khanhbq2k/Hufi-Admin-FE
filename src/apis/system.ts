import { some } from './../utils/constants/constant';
import api from '~/utils/helpers/api';

export const login = (data = {}, headers = {}) => {
  const option = {
    method: 'post',
    url: '/auth/login',
    data,
    headers,
  };
  return api(option);
};

export const getUserInfo = () => {
  const option = {
    method: 'get',
    url: '/auth/user',
  };
  return api(option);
};

export const logout = () => {
  const option = {
    method: 'delete',
    url: '/auth/logout',
  };
  return api(option);
};

export const getAirlines = () => {
  const option = {
    method: 'get',
    url: '/flight/airlines',
  };
  return api(option);
};

export const getAirports = (params = {}) => {
  const option = {
    method: 'get',
    url: '/flight/airports',
    params,
  };
  return api(option);
};

export const getAllCountries = () => {
  const option = {
    method: 'get',
    url: '/flight/countries',
  };
  return api(option);
};

export const getAllUsers = () => {
  const option = {
    method: 'get',
    url: '/crm/user',
  };
  return api(option);
};

export const createUser = (data: some = {}) => {
  const option = {
    method: 'post',
    url: '/crm/user',
    data: data,
  };
  return api(option);
};

export const blockUser = (userId: number) => {
  const option = {
    method: 'post',
    url: '/crm/user/' + userId + '/block',
  };
  return api(option);
};

export const unblockUser = (userId: number) => {
  const option = {
    method: 'post',
    url: '/crm/user/' + userId + '/unblock',
  };
  return api(option);
};

export const updateUserInfo = (data: some = {}) => {
  const option = {
    method: 'put',
    url: '/crm/user',
    data: data,
  };
  return api(option);
};
