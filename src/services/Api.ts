import request from './index';
import { AxiosResponse } from 'axios';
import { RcFile } from 'antd/es/upload/interface';

import type {
  Message,
  ApiPort,
  Addresses,
  FileList,
} from '@/declare/nodeApiType';

export default {
  // Api
  getPort(api: string): Promise<AxiosResponse<ApiPort>> {
    return request({
      url: api + '/apiPort',
    });
  },
  getFileInfo(api: string, hash: string): Promise<AxiosResponse<FileList>> {
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
  observeProxyGroup(
    api: string,
    proxyGroup: string,
    proxyNodes: string[],
  ): Promise<AxiosResponse<Message>> {
    return request({
      url: api + `/group/observe/` + proxyGroup,
      method: 'post',
      data: {
        nodes: proxyNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  observeStorageGroup(
    api: string,
    storeGroup: string,
    storeNodes: string[],
  ): Promise<AxiosResponse<Message>> {
    return request({
      url: api + `/group/observe/` + storeGroup,
      method: 'post',
      data: {
        nodes: storeNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  sendMessage(
    api: string,
    overlay: string,
    hash: string,
    storeGroup: string,
    source: string,
  ): Promise<AxiosResponse<{ data: string }>> {
    return request.post(
      api + `/group/send/${storeGroup}/` + overlay,
      {
        source: source,
        hash,
      },
      { timeout: 30 * 1000 },
    );
  },

  // DebugApi
  connect(debugApi: string, overlay: string): Promise<AxiosResponse<Message>> {
    return request({
      url: debugApi + '/connect/' + overlay,
      method: 'post',
    });
  },
  getAddresses(debugApi: string): Promise<AxiosResponse<Addresses>> {
    return request.get(debugApi + '/addresses');
  },
};
