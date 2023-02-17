import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import NewsletterUpload from '@/components/NewsletterUpload';

export type Props = {};
const Newsletter: React.FC<Props> = (props) => {
  return (
    <>
      <NewsletterUpload></NewsletterUpload>
      <NewsletterCard></NewsletterCard>
    </>
  );
};

export default Newsletter;
