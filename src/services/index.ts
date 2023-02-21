import axios from 'axios';

const request = axios.create({
  baseURL: '',
  timeout: 5e3,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // @ts-ignore
    config.headers['x-session-token'] = token;
  }

  return config;
});

export default request;
