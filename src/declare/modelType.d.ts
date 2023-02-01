import { Effect, ImmerReducer, Subscription } from 'umi';
import { State as GlobalState } from '@/models/global';
import { State as ManageState } from '@/models/manage';

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
}
