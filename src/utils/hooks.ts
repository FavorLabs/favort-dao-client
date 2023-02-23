import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { DomainName, ProxyGroupList } from '@/config/constants';

export const usePath = () => {
  const params = useParams<{ id: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    console.log('id', params.id);
    history.push(`/dao/${params.id}/${path}`);
  };
};

export const useUrl = () => {
  // let { api } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.250:8010/v1';
  // return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};

export const useResourceUrl = () => {
  // let { api } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.250:3000/paopao/avatars';
  // return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};

export const useVerifyChannel = () => {
  const { info } = useSelector((state: Models) => state.dao);
  const { user } = useSelector((state: Models) => state.global);
  return info?.address.toLowerCase() === user?.address?.toLowerCase();
};
