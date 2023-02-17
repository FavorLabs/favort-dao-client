import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';

export type Props = {};
const Latest: React.FC<Props> = (props) => {
  return (
    <>
      <NewsletterCard></NewsletterCard>
    </>
  );
};

export default Latest;
