import axios, { AxiosResponse } from 'axios';

const ReviteService = axios.create({
  baseURL: 'http://192.168.100.49:8000',
});

ReviteService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // @ts-ignore
    config.headers['x-session-token'] = token;
  }

  return config;
});

export default {
  hello() {
    return ReviteService({
      url: '/onboard/hello',
    });
  },
  create(name: string) {
    return ReviteService({
      method: 'post',
      url: '/servers/create',
      data: {
        name,
      },
    });
  },
  join(name: string) {
    return ReviteService({
      method: 'post',
      url: '/invites/' + name,
    });
  },
  leave(name: string) {
    return ReviteService({
      method: 'delete',
      url: '/servers/' + name,
    });
  },
};
