import request from '@/services';

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
};
