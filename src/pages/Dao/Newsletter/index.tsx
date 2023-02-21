import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import NewsletterUpload from '@/components/NewsletterUpload';
import VideoCard from '@/components/VideoCard';
import Skeleton from '@/components/Skeleton';

export type Props = {};
const Newsletter: React.FC<Props> = (props) => {
  return (
    <>
      <NewsletterUpload></NewsletterUpload>
      <NewsletterCard></NewsletterCard>
      <Skeleton loading={true} />
    </>
  );
};

export default Newsletter;
