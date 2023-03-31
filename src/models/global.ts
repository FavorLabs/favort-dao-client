import ModelsType, { Models } from '@/declare/modelType';

import { WebsocketProvider } from 'web3-core';

import { getEndPoint, splitUrl, websocket } from '@/utils/util';

import { ApiPort } from '@/declare/nodeApiType';
import { message } from 'antd';
import Api from '@/services/Api';
import { AxiosResponse } from 'axios';
import { ApiURL, DefaultApi, NodeConfig } from '@/config/constants';
import * as Events from 'events';
import FavorlabsApi from '@/services/FavorlabsApi';
import { Config } from '@/config/config';
import { Addresses } from '@/declare/nodeApiType';
import { Settings } from '@/declare/tubeApiType';

export interface State {
  api: string;
  debugApi: string;
  ws: null | (WebsocketProvider & Events);
  requestLoading: boolean;
  status: boolean;
  user: {
    address: string;
    avatar: string;
    id: string;
    nickname: string;
  } | null;
  config: Config | null;
  settings: Settings | null;
}

export default {
  state: {
    api: getEndPoint() || sessionStorage.getItem(ApiURL) || DefaultApi,
    debugApi: '',
    ws: null,
    requestLoading: true,
    status: false,
    user: null,
    config: null,
    settings: null,
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
        // sessionStorage.setItem(NodeConfig, JSON.stringify(config));
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
