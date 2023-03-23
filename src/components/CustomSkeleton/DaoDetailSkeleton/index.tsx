import * as React from 'react';
import styles from './index.less';
import DaoCardSkeleton from '@/components/CustomSkeleton/DaoDetailSkeleton/DaoCardSkeleton';
import { Skeleton } from 'antd-mobile';

export type Props = {};
const DaoDetailSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.daoDetailSkeleton}>
      <DaoCardSkeleton />
      <div className={styles.partWrap}>
        <Skeleton animated className={styles.title} />
        <Skeleton animated className={styles.item} />
        <Skeleton animated className={styles.item} />
      </div>
      <div className={styles.partWrap}>
        <Skeleton animated className={styles.title} />
        <Skeleton animated className={styles.item} />
      </div>
    </div>
  );
};

export default DaoDetailSkeleton;
