import ModelsType, { Models } from '@/declare/modelType';

import { WebsocketProvider } from 'web3-core';
import Web3 from 'web3';

import { getEndPoint, splitUrl, websocket } from '@/utils/util';

import { ApiPort, CLRes } from '@/declare/api';
import { message } from 'antd';
import Api from '@/services/Api';
import { AxiosResponse } from 'axios';
import { ApiURL, DefaultApi } from '@/config/constants';
import * as Events from 'events';

export interface State {
  api: string;
  debugApi: string;
  ws: null | (WebsocketProvider & Events);
  web3: null | Web3;
  nodeWeb3: null | Web3;
  address: string;
  proxyGroup: string;
  requestLoading: boolean;
  status: boolean;
  channelInfo: CLRes | null;
}

export default {
  state: {
    api: sessionStorage.getItem(ApiURL) || getEndPoint() || DefaultApi,
    debugApi: '',
    ws: null,
    web3: null,
    nodeWeb3: null,
    address: '',
    proxyGroup: '',
    requestLoading: true,
    status: true,
    channelInfo:
      JSON.parse(sessionStorage.getItem('channelInfo') as string) || null,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  effects: {
    *getStatus({ payload }, { call, put }) {
      const { api } = payload;
      try {
        const apiPort: AxiosResponse<ApiPort> = yield call(Api.getPort, api);
        let { debugApiPort, rpcWsPort } = apiPort.data;
        if (!debugApiPort || !rpcWsPort)
          throw new Error('DebugApi or Websocket is not enabled');
        let [protocol, hostname] = splitUrl(api);
        let debugApi = `${protocol}//${hostname}:${debugApiPort}`;
        let wsApi = `${
          protocol === 'http:' ? 'ws' : 'wss'
        }://${hostname}:${rpcWsPort}`;
        let ws = websocket(wsApi);
        yield put({
          type: 'updateState',
          payload: { api, debugApi, ws, status: true },
        });
        sessionStorage.setItem(ApiURL, api);
      } catch (e) {
        console.log(e);
        if (e instanceof Error) message.info(e.message);
        yield put({
          type: 'updateState',
          payload: {
            status: false,
          },
        });
      }
    },
  },
  subscriptions: {},
} as ModelsType<State>;
