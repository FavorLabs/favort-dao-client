import * as React from 'react';
import styles from './index.less';
import AvatarSkeleton from '@/components/CustomSkeleton/AvatarSkeleton';
import { Skeleton } from 'antd-mobile';

export type Props = {};
const HeaderSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.headerSkeleton}>
      <div className={styles.info}>
        <AvatarSkeleton size={'2.375rem'} />
        <div className={styles.nameTime}>
          <Skeleton animated className={styles.name} />
          <Skeleton animated className={styles.time} />
        </div>
      </div>
      <Skeleton animated className={styles.action} />
    </div>
  );
};

export default HeaderSkeleton;
