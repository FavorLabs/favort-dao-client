import request from './index';
import { AxiosResponse } from 'axios';
import {
  CLCreatePS,
  Data,
  CLRes,
  CLUpdatePS,
  VideoRes,
  VideoUpdatePS,
  VideoListParams,
  VideoListRes,
} from '@/declare/api';

export default {
  createChannel(
    url: string,
    data: CLCreatePS,
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
      url: url + '/channel/' + address,
    });
  },
  updateChanel(
    url: string,
    address: string,
    data: CLUpdatePS,
  ): Promise<AxiosResponse<Data<CLRes>>> {
    return request({
      url: url + '/channel/' + address,
      method: 'patch',
      data,
    });
  },

  getCategory(
    url: string,
    channelId: string,
  ): Promise<AxiosResponse<Data<string[]>>> {
    return request({
      url: url + '/videos/category',
      params: {
        channelId,
      },
    });
  },
  getVideo(
    url: string,
    id: string,
  ): Promise<AxiosResponse<Data<Required<VideoRes>>>> {
    return request({
      url: url + '/videos/' + id,
    });
  },
  uploadVideo(
    url: string,
    data: VideoUpdatePS,
  ): Promise<AxiosResponse<Data<Required<VideoRes>>>> {
    return request({
      url: url + '/videos',
      method: 'post',
      data,
    });
  },
  updateVideo(
    url: string,
    id: string,
    data: VideoUpdatePS,
  ): Promise<AxiosResponse<Data<Required<VideoRes>>>> {
    return request({
      url: url + '/videos/' + id,
      method: 'patch',
      data,
    });
  },
  deleteVideo(
    url: string,
    id: string,
  ): Promise<AxiosResponse<Data<Required<VideoRes>>>> {
    return request({
      url: url + '/videos/' + id,
      method: 'delete',
    });
  },
  getVideos(
    url: string,
    params: VideoListParams,
  ): Promise<AxiosResponse<Data<Required<VideoListRes>>>> {
    return request({
      url: url + '/videos',
      params,
    });
  },
};
