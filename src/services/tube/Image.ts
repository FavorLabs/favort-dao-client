import request from '../index';
import { AxiosResponse } from 'axios';
import { ResData } from '@/declare/tubeApiType';
import { ApiPort } from '@/declare/nodeApiType';

export default {
  upload(url: string, data: FormData): Promise<AxiosResponse<{ id: string }>> {
    return request({
      method: 'post',
      url: url,
      data,
    });
  },
};
