import request from '../index';
import { AxiosResponse } from 'axios';
import type { Data, SubRes } from '@/declare/tubeApiType';

export default {
  getChannel(url: string): Promise<AxiosResponse<Data<SubRes[]>>> {
    return request({
      url: url + '/subscriptions/channels',
    });
  },
  checkSub(
    url: string,
    channelId: string,
  ): Promise<AxiosResponse<Data<SubRes>>> {
    return request({
      method: 'post',
      url: url + '/subscriptions/check',
      data: { channelId },
    });
  },
};
