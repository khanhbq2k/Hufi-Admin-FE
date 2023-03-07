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
    url: '/getAllCountries',
  };
  return api(option);
};

export const getAllUserList = () => {
  let listUser: any[] = [];
  [...Array(50)].forEach((el: any, idx: number) => {
    listUser.push({
      id: idx + 1,
      channelId: idx + 2,
      gender: 'M',
      firstName: 'Khanh',
      lastName: 'Bui',
      fullName: 'Bui Khanh',
      email: 'test@gmail.com',
      phone: '0985284827',
      avatar: `https://picsum.photos/id/${idx + 1}/50/50 `,
      active: idx % 3 ? true : false,
    });
  });

  return {
    data: listUser,
    message: 200,
  };
};
