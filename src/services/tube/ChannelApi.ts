import type { Data, CreateCL, UpdateCL, CLRes } from '@/declare/tubeApiType';
import type { AxiosResponse } from 'axios';
import request from '@/services';

export default {
  createChannel(
    url: string,
    data: CreateCL,
  ): Promise<AxiosResponse<Data<CLRes>>> {
    return request({
      method: 'post',
      url: url + '/channel',
      data,
    });
  },
  getChannelInfo(
    url: string,
    address: string,
  ): Promise<AxiosResponse<Data<CLRes>>> {
    return request({
      url: url + '/channel',
      params: { address },
    });
  },
  updateChanel(
    url: string,
    data: UpdateCL,
  ): Promise<AxiosResponse<Data<CLRes>>> {
    return request({
      url: url + '/channel',
      method: 'put',
      data,
    });
  },
  updateImg(
    url: string,
    type: 'avatar' | 'banner',
    data: FormData,
  ): Promise<AxiosResponse<Data<CLRes>>> {
    return request({
      method: 'put',
      url: url + '/channel/' + type,
      data,
    });
  },
};
