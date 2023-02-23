import axios, { AxiosResponse } from 'axios';
import { Config } from '@/config/config';

const FavorlabsService = axios.create({
  baseURL: 'https://service.favorlabs.io/api/v1',
  // timeout: 5e3,
});

export default {
  getConfig(networkId: number): Promise<AxiosResponse<{ data: Config }>> {
    return FavorlabsService({
      url: '/config',
      params: {
        networkId,
      },
    });
  },
};
