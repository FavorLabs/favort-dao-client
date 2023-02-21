import { Effect, ImmerReducer, Subscription } from 'umi';
import { State as GlobalState } from '@/models/global';
import { State as ManageState } from '@/models/manage';
import { State as Web3State } from '@/models/web3';
import { State as DaoState } from '@/models/dao';

export default interface ModelsType<T> {
  namespace?: string;
  state: T;
  reducers: {
    [propName: string]: ImmerReducer<T>;
  };
  effects?: {
    [propName: string]: Effect;
  };
  subscriptions?: {
    [propName: string]: Subscription;
  };
}

export interface Models {
  global: GlobalState;
  manage: ManageState;
  web3: Web3State;
  dao: DaoState;
}
