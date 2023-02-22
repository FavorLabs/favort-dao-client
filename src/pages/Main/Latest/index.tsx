import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import { useEffect, useState } from 'react';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfoRes } from '@/declare/tubeApiType';
import VideoCard from '@/components/VideoCard';

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

  const getCard = (item: PostInfoRes) => {
    if (item.type === 0) {
      return <NewsletterCard cardData={item} />;
    } else if (item.type === 1) {
      return (
        <div className={styles.videoCard}>
          <VideoCard videoInfo={item} openThumb={false} />
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getList();
  }, []);
  console.log('dataList', dataList);
  return (
    <>
      {dataList.map((item, index) => (
        <div key={index}>{getCard(item)}</div>
      ))}
    </>
  );
};

export default Latest;
