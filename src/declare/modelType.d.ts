import { Effect, ImmerReducer, Subscription } from 'umi';
import { State as GlobalState } from '@/models/global';

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
}
