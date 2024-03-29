import type { AxiosResponse } from 'axios';
import request from '@/services';
import {
  DaoInfo,
  DaoParams,
  ListData,
  Page,
  ResData,
  Status,
} from '@/declare/tubeApiType';

export default {
  get(url: string) {
    return request({
      url: url + '/dao/my',
    });
  },
  getById(url: string, id: string): ResData<DaoInfo> {
    return request({
      url: url + '/dao',
      params: { dao_id: id },
    });
  },
  create(url: string, data: DaoParams): ResData<DaoInfo> {
    return request({
      url: url + '/dao',
      method: 'post',
      data,
    });
  },
  getBookmarkList(url: string, params: Page): ResData<ListData<DaoInfo>> {
    return request({
      url: url + '/daos',
      params,
    });
  },
  checkBookmark(url: string, id: string): ResData<Status> {
    return request({
      url: url + '/dao/bookmark',
      params: { dao_id: id },
    });
  },
  bookmark(url: string, id: string): ResData<Status> {
    return request({
      method: 'post',
      url: url + '/dao/bookmark',
      data: { dao_id: id },
    });
  },
  queryDao(url: string, text: string): ResData<ListData<DaoInfo>> {
    return request({
      url: url + '/daos',
      params: { query: text },
    });
  },
};
