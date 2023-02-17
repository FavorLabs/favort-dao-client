import request from '../index';
import { AxiosResponse } from 'axios';

export default {
  check(url: string, videoId: string) {
    return request({
      method: 'post',
      url: url + '/feelings/check',
      data: {
        videoId,
      },
    });
  },
  create(url: string, videoId: string) {
    return request({
      method: 'post',
      url: url + '/feelings',
      data: {
        videoId,
      },
    });
  },
};
