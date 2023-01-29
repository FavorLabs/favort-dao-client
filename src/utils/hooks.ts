import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { DomainName } from '@/config/constants';

export const usePath = () => {
  const params = useParams<{ address: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/${params.address}/${path}`);
  };
};

export const useUrl = () => {
  const { api, proxyGroup } = useSelector((state: Models) => state.global);
  return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};
