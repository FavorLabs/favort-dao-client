import axios, { AxiosResponse } from 'axios';
import { Config } from '@/config/config';

const FavorlabsService = axios.create({
  // baseURL: 'https://service.favorlabs.io/api/v1',
  baseURL: 'http://94.103.5.122:1999/api/v1',
  // timeout: 5e3,
});

export default {
  getConfig(
    networkId: number,
    name?: string,
  ): Promise<AxiosResponse<{ data: Config }>> {
    return FavorlabsService({
      url: '/appConfig',
      params: {
        networkId,
        name,
      },
    });
  },
};
