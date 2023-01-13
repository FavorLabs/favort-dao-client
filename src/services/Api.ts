import request from './index';
import { AxiosResponse } from 'axios';
import { ApiPort } from '@/declare/api';

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
  getPort(api: string): Promise<AxiosResponse<ApiPort>> {
    return request({
      url: api + '/apiPort',
    });
  },
};
