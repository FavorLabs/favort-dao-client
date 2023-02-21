import request from '../index';
import { AxiosResponse } from 'axios';

export default {
  upload(url: string) {
    return request({
      method: 'post',
      url: url + '/',
    });
  },
};
