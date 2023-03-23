import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { Skeleton } from 'antd-mobile';
import HeaderSkeleton from '@/components/CustomSkeleton/PostSkeleton/HeaderSkeleton';

export type Props = {};
const DetailSkeleton: React.FC<Props> = (props) => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const pathname = history.location.pathname;

  useEffect(() => {
    if (pathname.includes('/newsletterDetail') || pathname.includes('/video')) {
      setShowHeader(false);
    }
  }, [pathname]);

  return (
    <div className={styles.detailSkeleton}>
      {showHeader && <HeaderSkeleton />}
      <Skeleton animated className={styles.detail} />
      <div className={styles.countItems}>
        <Skeleton animated className={styles.view} />
        <Skeleton animated className={styles.comment} />
        <Skeleton animated className={styles.like} />
      </div>
    </div>
  );
};

export default DetailSkeleton;
