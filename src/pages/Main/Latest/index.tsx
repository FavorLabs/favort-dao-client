import * as React from 'react';
import styles from './index.less';
import NewsletterCard from '@/components/NewsletterCard';
import { useEffect } from 'react';

export type Props = {};
const Latest: React.FC<Props> = (props) => {
  useEffect(() => {});
  return (
    <>
      <NewsletterCard></NewsletterCard>
    </>
  );
};

export default Latest;
