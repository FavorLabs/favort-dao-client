import ModelsType from '@/declare/modelType';
import { DaoInfo } from '@/declare/tubeApiType';

export interface State {
  info: DaoInfo | null;
  userInfo: DaoInfo | null;
}

export default {
  state: {
    info: null,
    userInfo: null,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
} as ModelsType<State>;
