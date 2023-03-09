import * as React from 'react';
import styles from './index.less';
import { useEffect, useState } from 'react';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo } from '@/declare/tubeApiType';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};

const Chat: React.FC<Props> = (props) => {
  const url = useUrl();
  const [chatList, setChatList] = useState<DaoInfo[]>([]);
  const { api, config } = useSelector((state: Models) => state.global);

  const getList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) setChatList(data.data.list);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.list}></div>
    </div>
  );
};

export default Chat;
