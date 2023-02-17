import ModelsType from '@/declare/modelType';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export interface State {
  address: string;
  web3: Web3 | null;
  nodeWeb3: Web3 | null;
  tubeContract: Contract | null;
  tokenContract: Contract | null;
  tokenInfo: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export default {
  state: {
    address: '',
    web3: null,
    nodeWeb3: null,
    tubeContract: null,
    tokenContract: null,
    tokenInfo: {
      name: '',
      symbol: '',
      decimals: 0,
    },
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
} as ModelsType<State>;
