import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import NewsletterUpload from '@/components/NewsletterUpload';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl, useVerifyChannel } from '@/utils/hooks';
import Skeleton from '@/components/Skeleton';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Newsletter: React.FC<Props> = (props) => {
  const url = useUrl();
  const verifyChannel = useVerifyChannel();
  const { info } = useSelector((state: Models) => state.dao);
  const { refreshVideoList } = useSelector((state: Models) => state.manage);

  const [newsletterList, setNewsletterList] = useState<any[]>([]);

  const getNewsletterList = async () => {
    const { data } = await PostApi.getPostListByAddress(
      url,
      info?.address as string,
      {
        page: 1,
        page_size: 100,
        type: 0,
      },
    );
    if (data.data) {
      setNewsletterList(data.data.list);
    }
  };

  useEffect(() => {
    getNewsletterList();
  }, [refreshVideoList]);

  return (
    <>
      {/*<Skeleton loading={true} />*/}
      {verifyChannel && <NewsletterUpload />}
      {newsletterList.map(
        (item, index) =>
          item.type === 0 && (
            <div key={index}>
              <NewsletterCard cardData={item} />
            </div>
          ),
      )}
    </>
  );
};

export default Newsletter;
