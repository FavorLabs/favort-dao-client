import request from '@/services';
import { BucketRes, ResData } from '@/declare/tubeApiType';

export default {
  getBucket(url: string): ResData<BucketRes> {
    return request({
      url: url + '/',
    });
  },
};
