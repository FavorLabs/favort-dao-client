import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import {
  AutumnDomainName,
  DaoDomainName,
  ProxyGroup,
} from '@/config/constants';
import { config } from '@/config/config';

export const usePath = () => {
  const params = useParams<{ id: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/dao/${params.id}/${path}`);
  };
};

export const useUrl = () => {
  // let { api } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.250:8010/v1';
  // return api + '/group/http/' + ProxyGroup + '/' + DaoDomainName + '/api/v1';
  // return api + '/group/http/' + config.proxyGroup + '/' + config.domainName + '/api/v1';
};

export const useResourceUrl = () => {
  let { api } = useSelector((state: Models) => state.global);
  return api + '/group/http/' + ProxyGroup + '/' + AutumnDomainName + '/api/v1';
  // return api + '/group/http/' + config.proxyGroup + '/' + config.domainName + '/api/v1';
};

export const useVerifyChannel = () => {
  const { info } = useSelector((state: Models) => state.dao);
  const { user } = useSelector((state: Models) => state.global);
  return info?.address.toLowerCase() === user?.address?.toLowerCase();
};
