import ModelsType from '@/declare/modelType';
import { CLRes, DaoInfo } from '@/declare/tubeApiType';

export interface State {
  info: DaoInfo | null;
}

export default {
  state: {
    info: null,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
} as ModelsType<State>;
