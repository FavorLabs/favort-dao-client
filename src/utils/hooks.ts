import { history, useParams } from 'umi';

export const usePath = () => {
  const params = useParams<{ address: string }>();
  return (path: string = '') => {
    path = path.replace(/^\//, '');
    history.push(`/${params.address}/${path}`);
  };
};
