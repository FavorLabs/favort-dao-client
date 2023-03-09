import type { AxiosResponse } from 'axios';
import request from '@/services';
import {
  CreatePost,
  ListData,
  Page,
  PostInfo,
  ResData,
  Status,
} from '@/declare/tubeApiType';

export default {
  createPost(url: string, data: CreatePost): ResData<PostInfo> {
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
      type?: number;
    },
  ): ResData<ListData<PostInfo>> {
    return request({
      url: url + '/posts',
      params,
    });
  },
  getPostListByAddress(
    url: string,
    address: string,
    params: {
      page: number;
      page_size: number;
      type?: number;
    },
  ): ResData<ListData<PostInfo>> {
    return request({
      url: url + `/user/posts?address=${address}`,
      params,
    });
  },
  getPostById(url: string, id: string): ResData<PostInfo> {
    return request({
      url: url + '/post',
      params: {
        id,
      },
    });
  },
  deletePost(url: string, id: string): ResData<Status> {
    return request({
      method: 'delete',
      url: url + `/post?id=${id}`,
    });
  },
  getRecommend(url: string, params: Page): ResData<any> {
    return request({
      method: 'get',
      url: url + `/posts/focus`,
      params,
    });
  },
};
