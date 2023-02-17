import ModelsType from '@/declare/modelType';
import { CLRes } from '@/declare/tubeApiType';

export interface State {
  channelInfo: CLRes | null;
  sub: boolean;
  bookmark: boolean;
}

export default {
  state: {
    channelInfo: null,
    sub: false,
    bookmark: false,
  },
  reducers: {
    updateState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
} as ModelsType<State>;
