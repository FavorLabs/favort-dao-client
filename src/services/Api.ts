import request from './index';
import { AxiosResponse } from 'axios';
import { ApiPort } from '@/declare/api';
import { RcFile } from 'antd/es/upload/interface';

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
  uploadFile(url: string, file: RcFile) {
    let fileName = file.name;
    let headers = {};
    // @ts-ignore
    headers['Content-Type'] = file.type || 'application/x-www-form-urlencoded';
    return request({
      url: url + '/file',
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
  async sendMessage(
    api: string,
    debugApi: string,
    overlay: string,
    hash: string,
    storeGroup: string,
  ) {
    const data = await request.get(debugApi + '/addresses');
    return request.post(
      api + `/group/send/${storeGroup}/` + overlay,
      {
        source: data.data.overlay,
        hash,
      },
      { timeout: 30 * 1000 },
    );
  },
  uploadVideo(url: string, overlay: string) {
    return request.post('videos', { url, overlay });
  },
  getAll(favorUrl: string) {
    return request.get(favorUrl + '/category');
  },
};
