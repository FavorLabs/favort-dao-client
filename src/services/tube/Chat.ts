import type { AxiosResponse } from 'axios';
import request from '@/services';
import { GetMsgIdRes, GetMsgRes } from '@/declare/tubeApiType';

export default {
  getMsgIdByName(
    url: string,
    hash: string,
  ): Promise<AxiosResponse<GetMsgIdRes>> {
    return request({
      url: url + `/channels/${hash}`,
    });
  },
  getMsgById(
    url: string,
    hash: string,
    messageId: string,
  ): Promise<AxiosResponse<GetMsgRes>> {
    return request({
      url: url + `/channels/${hash}/messages/${messageId}`,
    });
  },
};
