import request from '@/services';
import { ResData, Statistic } from '@/declare/tubeApiType';

export default {
  signIn(
    url: string,
    data: {
      timestamp: number;
      wallet_addr: string;
      signature: string;
      type: string;
    },
  ) {
    return request({
      method: 'post',
      url: url + '/auth/login',
      data,
    });
  },
  getInfo(url: string) {
    return request({
      url: url + '/user/info',
    });
  },
  getStatistic(url: string): ResData<Statistic> {
    return request({
      url: url + '/user/statistic',
    });
  },
};
