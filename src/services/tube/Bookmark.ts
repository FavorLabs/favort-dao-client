import request from '../index';
import { AxiosResponse } from 'axios';
import type { Data, BookmarkRes } from '@/declare/tubeApiType';

export default {
  getChannels(url: string): Promise<AxiosResponse<Data<BookmarkRes[]>>> {
    return request({
      url: url + '/bookmarks/channels',
    });
  },
  createBookmark(
    url: string,
    channelId: string,
  ): Promise<AxiosResponse<Data<BookmarkRes>>> {
    return request({
      method: 'post',
      url: url + '/bookmarks',
      data: {
        channelId,
      },
    });
  },
  deleteBookmark(
    url: string,
    channelId: string,
  ): Promise<AxiosResponse<Data<BookmarkRes>>> {
    return request({
      method: 'delete',
      url: url + '/bookmarks',
      data: {
        channelId,
      },
    });
  },
  checkBookmark(
    url: string,
    channelId: string,
  ): Promise<AxiosResponse<Data<BookmarkRes>>> {
    return request({
      method: 'post',
      url: url + '/bookmarks/check',
      data: {
        channelId,
      },
    });
  },
};
