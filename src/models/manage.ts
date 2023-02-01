import ModelsType, { Models } from '@/declare/modelType';

export interface State {
  refreshVideoList: boolean;
}

export default {
  state: {
    refreshVideoList: false,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  effects: {
    //
  },
  subscriptions: {},
} as ModelsType<State>;
