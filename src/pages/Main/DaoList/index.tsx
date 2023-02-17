import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import OnChange from '@/declare/event';
import avatar_2 from '@/assets/img/avatar_2.jpg';
import DaoCard from '@/components/DaoCard';

export type Props = {};
type daoItem = {
  daoName: string;
  address: string;
};
const DaoList: React.FC<Props> = (props) => {
  const [subDaoList, setSubDaoList] = useState<daoItem[]>([]);

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
    setSubDaoList(temp);
  };

  const onChange = (e: any) => {
    //
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.search}>
          <Input
            className={styles.input}
            placeholder="community name"
            onChange={onChange}
            prefix={<SearchOutlined />}
            allowClear
            addonAfter={<span>Search</span>}
          />
        </div>
        <div className={styles.subDao}>
          <div className={styles.title}>Already subscribed DAO</div>
          <div className={styles.subDaoList}>
            {subDaoList.map((item, index) => (
              <DaoCard
                key={index}
                avatar={avatar_2}
                daoName={item.daoName}
                address={item.address}
                action="dao"
                size={36}
              />
            ))}
          </div>
        </div>
        <div className={styles.interestDao}>
          <div className={styles.title}>DAOs you may be interested in</div>
          <div className={styles.interestDaoList}>
            {subDaoList.map((item, index) => (
              <DaoCard
                key={index}
                avatar={avatar_2}
                daoName={item.daoName}
                address={item.address}
                action="dao"
                size={36}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoList;
