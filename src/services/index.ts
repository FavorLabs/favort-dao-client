import axios, { Canceler } from 'axios';
import NProgress from 'nprogress';

const request = axios.create({
  baseURL: '',
  timeout: 5e3,
});

const token = localStorage.getItem('token');
if (token) {
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
}

let requestIndex: number = 0;
let responseIndex: number = 0;

request.interceptors.request.use(
  (config) => {
    requestIndex++;
    NProgress.start();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    responseIndex++;
    if (responseIndex === requestIndex) {
      NProgress.done();
    }
    return response;
  },
  (error) => {
    responseIndex++;
    if (responseIndex === requestIndex) {
      NProgress.done();
    }
    return Promise.reject(
      error.response?.data ? Error(JSON.stringify(error.response.data)) : error,
    );
  },
);

export default request;
