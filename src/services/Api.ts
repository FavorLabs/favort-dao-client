import request from './index';
import { AxiosResponse } from 'axios';
import { ApiPort } from '@/declare/api';
import { RcFile } from 'antd/es/upload/interface';

type ChannelInfo = {
  name?: string;
  address: string;
  avatar?: string;
  banner?: string;
  introduction?: string;
  topVideoId?: Video | null;
};
type Video = {
  channelId: ChannelInfo;
  title: string;
  description: string;
  tags?: [];
  thumbnail: string;
  hash: string;
  category?: string;
  overlay: string;
};
type VideoListParams = {
  page?: number;
  count?: number;
  category?: string;
  channelId?: string;
};
type Data<T> = {
  success: boolean;
  data: T;
};

export default {
  observeProxyGroup(api: string, proxyGroup: string, proxyNodes: string[]) {
    return request({
      url: api + `/group/observe/` + proxyGroup,
      method: 'post',
      data: {
        nodes: proxyNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  observeStorageGroup(api: string, storeGroup: string, storeNodes: string[]) {
    return request({
      url: api + `/group/observe/` + storeGroup,
      method: 'post',
      data: {
        nodes: storeNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  getPort(api: string): Promise<AxiosResponse<ApiPort>> {
    return request({
      url: api + '/apiPort',
    });
  },
  uploadFile(api: string, file: RcFile) {
    let fileName = file.name;
    let headers = {};
    // @ts-ignore
    headers['Content-Type'] = file.type || 'application/x-www-form-urlencoded';
    return request({
      url: api + '/file',
      method: 'post',
      data: file,
      params: { name: fileName },
      headers,
      timeout: 0,
    });
  },
  getFileInfo(api: string, hash: string) {
    return request({
      url: api + '/file',
      method: 'get',
      params: {
        page: JSON.stringify({ pageNum: 1, pageSize: 1 }),
        sort: JSON.stringify({ key: 'rootCid', order: 'asc' }),
        filter: JSON.stringify([{ key: 'rootCid', value: hash, term: 'cn' }]),
      },
    });
  },
  connect(debugApi: string, overlay: string) {
    return request({
      url: debugApi + '/connect/' + overlay,
      method: 'post',
    });
  },
  getAddresses(debugApi: string) {
    return request.get(debugApi + '/addresses');
  },
  async sendMessage(
    api: string,
    debugApi: string,
    overlay: string,
    hash: string,
    storeGroup: string,
  ) {
    const data = await this.getAddresses(debugApi);
    return request.post(
      api + `/group/send/${storeGroup}/` + overlay,
      {
        source: data.data.overlay,
        hash,
      },
      { timeout: 30 * 1000 },
    );
  },

  createChannel(
    url: string,
    data: ChannelInfo,
  ): Promise<AxiosResponse<Data<ChannelInfo>>> {
    return request({
      method: 'post',
      url: url + '/channel',
      data,
    });
  },
  getChannelInfo(
    url: string,
    address: string,
  ): Promise<AxiosResponse<Data<ChannelInfo>>> {
    return request({
      url: url + '/channel/' + address,
    });
  },
  updateChanel(
    url: string,
    address: string,
    data: Omit<ChannelInfo, 'address'>,
  ): Promise<AxiosResponse<Data<ChannelInfo>>> {
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
  getVideo(url: string, id: string): Promise<AxiosResponse<Data<Video>>> {
    return request({
      url: url + '/videos/' + id,
    });
  },
  uploadVideo(url: string, data: Video): Promise<AxiosResponse<Data<Video>>> {
    return request({
      url: url + '/videos',
      method: 'post',
      data,
    });
  },
  updateVideo(
    url: string,
    id: string,
    data: Omit<Readonly<Video>, 'channelId' | 'hash' | 'overlay'>,
  ): Promise<AxiosResponse<Data<Video>>> {
    return request({
      url: url + '/videos/' + id,
      method: 'patch',
      data,
    });
  },
  deleteVideo(url: string, id: string): Promise<AxiosResponse<Data<Video>>> {
    return request({
      url: url + '/videos/' + id,
      method: 'delete',
    });
  },
  getVideos(
    url: string,
    params: VideoListParams,
  ): Promise<AxiosResponse<Data<Video[]>>> {
    return request({
      url: url + '/videos',
      params,
    });
  },
};
