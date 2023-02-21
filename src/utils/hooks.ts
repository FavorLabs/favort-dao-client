import { history, useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { DomainName, ProxyGroupList } from '@/config/constants';

export const usePath = () => {
  const params = useParams<{ address: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/dao/${params.address}/${path}`);
  };
};

export const useUrl = () => {
  let { api } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.129:8008/v1';
  // return 'http://192.168.100.49:8008/v1';
  // return 'http://192.168.100.77:8008/v1';
  // if(!proxyGroup){
  //   proxyGroup = ProxyGroupList[0].name
  // }
  // return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};

export const useResourceUrl = () => {
  let { api } = useSelector((state: Models) => state.global);
  return 'http://192.168.100.250:3000/paopao/avatars/';
  // if(!proxyGroup){
  //   proxyGroup = ProxyGroupList[0].name
  // }
  // return api + '/group/http/' + proxyGroup + '/' + DomainName + '/api/v1';
};

export const useVerifyChannel = () => {
  const { address } = useSelector((state: Models) => state.web3);
  const { channelInfo } = useSelector((state: Models) => state.channel);
  return address?.toLowerCase() === channelInfo?.address?.toLowerCase();
};
