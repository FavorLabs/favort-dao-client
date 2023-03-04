import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { AutumnDomainName, DaoDomainName } from '@/config/constants';
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
};

export const useResourceUrl = () => {
  let { api, config } = useSelector((state: Models) => state.global);
  if (!config) return '';
  return (
    api +
    '/group/http/' +
    config.proxyGroup +
    '/' +
    AutumnDomainName +
    '/paopao19/avatars'
  );
};

export const useVerifyChannel = () => {
  const { info } = useSelector((state: Models) => state.dao);
  const { user } = useSelector((state: Models) => state.global);
  return info?.address.toLowerCase() === user?.address?.toLowerCase();
};
