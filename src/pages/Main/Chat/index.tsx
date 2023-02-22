import * as React from 'react';
import styles from './index.less';
import DaoCard from '@/components/DaoCard';
import avatar_2 from '@/assets/img/avatar_2.jpg';
import { useEffect, useState } from 'react';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo } from '@/declare/tubeApiType';
import WebUtils from 'web3-utils';
import { ReviteURL } from '@/config/constants';

export type Props = {};

const Chat: React.FC<Props> = (props) => {
  const url = useUrl();
  const [chatList, setChatList] = useState<DaoInfo[]>([]);

  const getList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) setChatList(data.data.list);
  };

  useEffect(() => {
    getList();
  }, []);
  const clickHandle = (item: DaoInfo) => {
    const hash = WebUtils.keccak256(`server_${item.name}`);
    const token = localStorage.getItem('token');
    window.open(`${ReviteURL}/server/${hash.slice(2)}?token=${token}`);
  };

  return (
    <div className={styles.content}>
      <div className={styles.list}>
        {chatList.map((item, index) => (
          <div className={styles.list_item} key={index}>
            <DaoCard
              key={1}
              name={item.name}
              avatar={item.avatar}
              clickHandle={() => clickHandle(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
