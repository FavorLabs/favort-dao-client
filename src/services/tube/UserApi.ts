import request from '@/services';

export default {
  signIn(data: {
    timestamp: number;
    wallet_addr: string;
    signature: string;
    type: string;
  }) {
    return request({
      method: 'post',
      url: '/v1/auth/login',
      data,
    });
  },
  getInfo() {
    return request({
      url: '/v1/user/info',
    });
  },
};
