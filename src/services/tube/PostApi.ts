import type { AxiosResponse } from 'axios';
import request from '@/services';
import { CreatePost } from '@/declare/tubeApiType';

export default {
  createPost(url: string, data: CreatePost): Promise<AxiosResponse<any>> {
    return request({
      method: 'post',
      url: url + '/post',
      data,
    });
  },
  getPostListByType(
    url: string,
    params: {
      page: number;
      page_size: number;
      type: number;
    },
  ): Promise<AxiosResponse<any>> {
    return request({
      url: url + '/posts',
      params,
    });
  },
  getPostListByAddress(
    url: string,
    address: string,
  ): Promise<AxiosResponse<any>> {
    return request({
      url: url + `/posts?address=${address}`,
    });
  },
};
