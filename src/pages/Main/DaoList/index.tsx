import * as React from 'react';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { AutoComplete } from 'antd';
import DaoCard from '@/components/DaoCard';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo } from '@/declare/tubeApiType';
import { useDebounceFn } from 'ahooks';

export type Props = {};

const DaoList: React.FC<Props> = (props) => {
  const url = useUrl();
  const [value, setValue] = useState('');
  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

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

  const { run } = useDebounceFn(async (value: string) => {
    if (!value) return setOptions([]);
    const { data } = await DaoApi.queryDao(url, value);
    const res = data.data.list?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setOptions(res || []);
  });
  const onSelect = async (value: string) => {
    history.push(`/dao/${value}`);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.search}>
          <AutoComplete
            options={options}
            style={{ width: '100%' }}
            onSelect={onSelect}
            onChange={run}
            placeholder="input here"
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
