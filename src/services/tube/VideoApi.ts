import { AxiosResponse } from 'axios';
import type {
  Data,
  VideoListParams,
  VideoListRes,
  VideoRes,
  CreateVideo,
  UpdateVideo,
} from '@/declare/tubeApiType';
import request from '@/services';

export default {
  getVideo(url: string, id: string): Promise<AxiosResponse<Data<VideoRes>>> {
    return request({
      url: url + '/videos/' + id,
    });
  },

  uploadVideo(
    url: string,
    data: CreateVideo,
  ): Promise<AxiosResponse<Data<VideoRes>>> {
    return request({
      url: url + '/videos',
      method: 'post',
      data,
    });
  },

  updateVideo(
    url: string,
    id: string,
    data: UpdateVideo,
  ): Promise<AxiosResponse<Data<VideoRes>>> {
    return request({
      url: url + '/videos/' + id,
      method: 'post',
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
    status: 'public' | 'secret' | 'private' = 'public',
  ): Promise<AxiosResponse<Data<VideoListRes>>> {
    return request({
      url: url + '/videos/' + status,
      params,
    });
  },

  updateThumbnails(
    url: string,
    id: string,
    data: FormData,
  ): Promise<AxiosResponse<Data<VideoRes>>> {
    return request({
      url: url + '/videos/' + id + '/thumbnails',
      method: 'put',
      data,
    });
  },
  addViews(url: string, id: string): Promise<AxiosResponse<Data<VideoRes>>> {
    return request({
      url: url + '/videos/' + id + '/views',
      method: 'put',
    });
  },
};
