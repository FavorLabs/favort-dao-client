import * as React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import WebUtils from 'web3-utils';
import { ReviteURL } from '@/config/constants';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { toChat } from '@/utils/util';
import { DaoInfo } from '@/declare/tubeApiType';

export type Props = {};
const Group: React.FC<Props> = (props) => {
  const { api } = useSelector((state: Models) => state.global);
  const { info } = useSelector((state: Models) => state.dao);
  return (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <Button
        onClick={() => {
          toChat(info?.name, api);
        }}
      >
        Go to chat
      </Button>
    </div>
  );
};

export default Group;
