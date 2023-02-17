import ModelsType, { Models } from '@/declare/modelType';

import { WebsocketProvider } from 'web3-core';
import Web3 from 'web3';

import { getEndPoint, splitUrl, websocket } from '@/utils/util';

import { ApiPort } from '@/declare/nodeApiType';
import { Data } from '@/declare/tubeApiType';
import { message } from 'antd';
import Api from '@/services/Api';
import { AxiosResponse } from 'axios';
import { ApiURL, DefaultApi } from '@/config/constants';
import * as Events from 'events';
import FavorlabsApi from '@/services/FavorlabsApi';
import { Config, setConfig } from '@/config/config';
import { Addresses } from '@/declare/nodeApiType';

export interface State {
  api: string;
  debugApi: string;
  ws: null | (WebsocketProvider & Events);
  requestLoading: boolean;
  status: boolean;
}

export default {
  state: {
    api: sessionStorage.getItem(ApiURL) || getEndPoint() || DefaultApi,
    debugApi: '',
    ws: null,
    requestLoading: true,
    status: false,
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
        let addresses: AxiosResponse<Addresses> = yield call(
          Api.getAddresses,
          debugApi,
        );
        const config: AxiosResponse<Data<Config>> = yield call(
          FavorlabsApi.getConfig,
          addresses.data.network_id,
        );
        setConfig(config.data.data);
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
