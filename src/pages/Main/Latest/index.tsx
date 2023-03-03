import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import { useEffect, useState } from 'react';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';
import VideoCard from '@/components/VideoCard';
import { useHistory } from 'umi';

export type Props = {};
const Latest: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();

  const [dataList, setDataList] = useState<PostInfo[]>([]);

  const getList = async () => {
    const { data } = await postApi.getPostListByType(url, {
      page: 1,
      page_size: 100,
    });
    if (data.data) {
      setDataList(data.data.list);
    }
  };

  const getCard = (item: PostInfo) => {
    if (item.type === 0) {
      return <NewsletterCard cardData={item} />;
    } else if (item.type === 1) {
      return (
        <div
          className={styles.videoCard}
          onClick={() => {
            history.push(`/video/${item.id}`);
          }}
        >
          <VideoCard videoInfo={item} />
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      {/*{dataList.map((item, index) => (*/}
      {/*  <div key={index}>{getCard(item)}</div>*/}
      {/*))}*/}
      {props.children}
    </>
  );
};

export default Latest;
