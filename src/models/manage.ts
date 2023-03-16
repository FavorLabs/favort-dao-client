import ModelsType from '@/declare/modelType';
export interface State {
  refreshVideoList: boolean;
  refreshPostList: boolean;
}

export default {
  state: {
    refreshVideoList: false,
    refreshPostList: false,
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
