import * as React from 'react';
import styles from './index.less';
import DaoCard from '@/components/DaoCard';
import avatar_2 from '@/assets/img/avatar_2.jpg';
import { useEffect, useState } from 'react';

export type Props = {};
type daoItem = {
  daoName: string;
  address: string;
};
const Chat: React.FC<Props> = (props) => {
  const [chatList, setChatList] = useState<daoItem[]>([]);

  const getList = () => {
    const temp = [];
    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        temp.push({
          daoName: `what is Web${i + 1}?`,
          address: '0xE28E429D3616Bb77Bee108FF943030B3311b4Ec3',
        });
      } else if (i == 1) {
        temp.push({
          daoName: `what is Web${i + 1}?`,
          address: '0xb50bbcd0d2c78fd4646e6f76a4800e7929710338',
        });
      } else {
        temp.push({ daoName: `what is Web${i + 1}?`, address: '0x123' });
      }
    }
    setChatList(temp);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.chatList}>
        {chatList.map((item, index) => (
          <DaoCard
            key={index}
            avatar={avatar_2}
            daoName={item.daoName}
            address={item.address}
            action="chat"
            size={36}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
