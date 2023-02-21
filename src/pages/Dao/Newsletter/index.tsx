import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import NewsletterUpload from '@/components/NewsletterUpload';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import Skeleton from '@/components/Skeleton';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Newsletter: React.FC<Props> = (props) => {
  const url = useUrl();
  const { info } = useSelector((state: Models) => state.dao);
  const { user } = useSelector((state: Models) => state.global);

  const [newsletterList, setNewsletterList] = useState([]);

  const getNewsletterList = async () => {
    const { data } = await PostApi.getPostListByType(url, {
      page: 1,
      page_size: 100,
      type: 0,
    });
    if (data.data) {
      setNewsletterList(data.data.list);
    }
  };

  useEffect(() => {
    getNewsletterList();
  }, []);

  return (
    <>
      {/*<Skeleton loading={true} />*/}
      {user?.address === info?.address && <NewsletterUpload />}
      {/*{newsletterList.map((item, index) => (*/}
      {/*  <div key={index}>*/}
      {/*    <NewsletterCard />*/}
      {/*  </div>*/}
      {/*))}*/}
    </>
  );
};

export default Newsletter;
