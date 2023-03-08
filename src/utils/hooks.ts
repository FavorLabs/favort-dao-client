import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { AutumnDomainName, DaoDomainName } from '@/config/constants';
import { BucketsPath } from '@/declare/tubeApiType';
// import { config } from '@/config/config';

export const usePath = () => {
  const params = useParams<{ id: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/dao/${params.id}/${path}`);
  };
};

export const useUrl = () => {
  let { api, config } = useSelector((state: Models) => state.global);
  if (!config) return '';
  return api + '/group/http/' + config.proxyGroup + '/' + DaoDomainName + '/v1';
  // return 'http://192.168.100.111:8010/v1';
};

export const useResourceUrl = (type: BucketsPath) => {
  let { api, config } = useSelector((state: Models) => state.global);
  if (!config) return '';
  return (
    api +
    '/group/http/' +
    config.proxyGroup +
    '/' +
    AutumnDomainName +
    '/paopao19/' +
    type
  );
};

export const useVerifyChannel = () => {
  const { info } = useSelector((state: Models) => state.dao);
  const { user } = useSelector((state: Models) => state.global);
  return info?.address.toLowerCase() === user?.address?.toLowerCase();
};
