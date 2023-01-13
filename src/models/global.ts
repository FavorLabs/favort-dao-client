import ModelsType, { Models } from '@/declare/modelType';

import { WebsocketProvider } from 'web3-core';
import Web3 from 'web3';

export interface State {
  status: boolean;
  api: string;
  debugApi: string;
  ws: null | WebsocketProvider;
  web3: null | Web3;
  nodeWeb3: null | Web3;
}

export default {
  state: {
    status: false,
    api: 'https://polygon.testnet.favorlabs.io:1603',
    debugApi: '',
    ws: null,
    web3: null,
    nodeWeb3: null,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  effects: {},
  subscriptions: {},
} as ModelsType<State>;
