import * as React from 'react';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import avatar_2 from '@/assets/img/avatar_2.jpg';
import DaoCard from '@/components/DaoCard';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo } from '@/declare/tubeApiType';

export type Props = {};

const DaoList: React.FC<Props> = (props) => {
  const url = useUrl();
  const [value, setValue] = useState('');
  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);

  const getBookmarkList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) setBookmarkList(data.data.list);
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  const clickHandle = (id: string) => {
    history.push({
      pathname: `/dao/${id}`,
    });
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.search}>
          <Input
            className={styles.input}
            placeholder="community name"
            onChange={(e) => setValue(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            value={value}
            addonAfter={<span>Search</span>}
          />
        </div>

        <div className={styles.dao}>
          <div className={styles.title}>DAOs you may be interested in</div>
          <div className={styles.list}>
            {bookmarkList.map((item, index) => (
              <div className={styles.list_item} key={index}>
                <DaoCard
                  key={1}
                  name={item.name}
                  avatar={item.avatar}
                  clickHandle={() => clickHandle(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoList;
