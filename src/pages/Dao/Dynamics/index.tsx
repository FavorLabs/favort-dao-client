import * as React from 'react';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import NewsletterCard from '@/components/NewsletterCard';
import VideoCard from '@/components/VideoCard';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfoRes } from '@/declare/tubeApiType';
import { useSelector, useHistory } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Dynamics: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();

  const [dynamicsList, setDynamicsList] = useState<PostInfoRes[]>([]);
  const { refreshVideoList } = useSelector((state: Models) => state.manage);
  const { info } = useSelector((state: Models) => state.dao);

  const getList = async () => {
    const { data } = await postApi.getPostListByAddress(url, info?.address);
    if (data.data) {
      setDynamicsList(data.data.list);
    }
  };

  const getCard = (item: PostInfoRes) => {
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
  }, [refreshVideoList]);

  return (
    <>
      <>
        {dynamicsList.map((item, index) => (
          <div key={index}>{getCard(item)}</div>
        ))}
      </>
    </>
  );
};

export default Dynamics;
