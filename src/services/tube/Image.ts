import request from '../index';
import { AxiosResponse } from 'axios';
import { ResData } from '@/declare/tubeApiType';

export default {
  upload(url: string, data: FormData): ResData<{ token: string }> {
    return request({
      method: 'post',
      url: url,
      data,
    });
  },
};
