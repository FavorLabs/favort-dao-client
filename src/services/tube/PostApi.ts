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
  getPostListByType(url: string, params: Page): ResData<ListData<PostInfo>> {
    return request({
      url: url + '/posts',
      params,
    });
  },
  getPostListByDaoId(
    url: string,
    daoId: string,
    params: Page,
  ): ResData<ListData<PostInfo>> {
    return request({
      url: url + `/dao/posts?daoId=${daoId}`,
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
  getFollow(url: string, params: Page): ResData<any> {
    return request({
      method: 'get',
      url: url + `/posts/focus`,
      params,
    });
  },
  checkPostLike(url: string, id: string): ResData<Status> {
    return request({
      url: url + '/post/star',
      params: { id },
    });
  },
  postLike(url: string, id: string): ResData<Status> {
    return request({
      method: 'post',
      url: url + '/post/star',
      data: { id },
    });
  },
};
