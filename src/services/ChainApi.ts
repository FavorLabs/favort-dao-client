import axios, { AxiosResponse } from 'axios';
import NProgress from 'nprogress';

const request = axios.create({
  baseURL: 'http://favortest.favorlabs.io/api/v1/chain',
  timeout: 2e3,
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(
      error.response?.data.error ? Error(error.response.data.error) : error,
    );
  },
);

type Data = {
  success: boolean;
  data: {
    address: string;
    channelName: string;
    group: string;
    overlay: string;
  };
};
export default {
  getService(
    params: { address: string } | { channelName: string },
  ): Promise<Data> {
    return request({
      url: '/',
      params,
    });
  },
  createService(data: {
    address: string;
    group: string;
    overlay: string;
  }): Promise<Data> {
    return request({
      url: '/',
      method: 'post',
      data,
    });
  },
  updateChannelName(data: {
    address: string;
    channelName: string;
  }): Promise<Data> {
    return request({
      url: '/updateChannelName',
      method: 'post',
      data,
    });
  },
};
