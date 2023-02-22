import * as React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import WebUtils from 'web3-utils';
import { ReviteURL } from '@/config/constants';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Group: React.FC<Props> = (props) => {
  const { info } = useSelector((state: Models) => state.dao);
  const goto = () => {
    const hash = WebUtils.keccak256(`server_${info?.name}`);
    const token = localStorage.getItem('token');
    window.open(`${ReviteURL}/server/${hash.slice(2)}?token=${token}`);
  };
  return (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <Button onClick={goto}>Go to chat</Button>
    </div>
  );
};

export default Group;
