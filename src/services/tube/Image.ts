import request from '../index';
import { AxiosResponse } from 'axios';

export default {
  upload(url: string, data: FormData) {
    return request({
      method: 'post',
      url: url,
      data,
    });
  },
};
