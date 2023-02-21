import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import { useEffect, useState } from 'react';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';

export type Props = {};
const Latest: React.FC<Props> = (props) => {
  const url = useUrl();

  const [dataList, setDataList] = useState([]);

  const getList = async () => {
    const { data } = await postApi.getPostListByType(url, {
      page: 1,
      page_size: 100,
    });
    if (data.data) {
      setDataList(data.data.list);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  console.log('dataList', dataList);
  return (
    <>
      {dataList.map((item, index) => (
        <div key={index}>
          <NewsletterCard cardData={item} />
        </div>
      ))}
    </>
  );
};

export default Latest;
