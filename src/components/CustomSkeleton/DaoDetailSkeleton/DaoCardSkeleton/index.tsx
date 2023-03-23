import * as React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd-mobile';

export type Props = {};
const DaoCardSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.daoCardSkeleton}>
      <Skeleton animated className={styles.cardWrap} />
    </div>
  );
};

export default DaoCardSkeleton;
