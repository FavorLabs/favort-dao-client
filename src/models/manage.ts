import ModelsType from '@/declare/modelType';
export interface State {
  refreshVideoList: boolean;
  refreshPostList: boolean;
  scrollPosition: {
    recommend: number;
    joined: number;
  };
}

export default {
  state: {
    refreshVideoList: false,
    refreshPostList: false,
    scrollPosition: {
      recommend: 0,
      joined: 0,
    },
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
