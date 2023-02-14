import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { DomainName } from '@/config/constants';

export const usePath = () => {
  const params = useParams<{ address: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/dao/${params.address}/${path}`);
  };
};

export const useUrl = () => {
  const { api, proxyGroup } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.54:3001' + '/api/v1';
  // return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};

export const useVerifyChannel = () => {
  const { address, channelInfo } = useSelector((state: Models) => state.global);
  return address?.toLowerCase() === channelInfo?.address?.toLowerCase();
};
