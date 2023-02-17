import request from '../index';
import { AxiosResponse } from 'axios';

export default {
  signIn(
    url: string,
    data: { timespan: number; address: string; signature: string },
  ): Promise<AxiosResponse<{ token: string }>> {
    return request({
      method: 'post',
      url: url + '/user/login',
      data,
    });
  },
};
