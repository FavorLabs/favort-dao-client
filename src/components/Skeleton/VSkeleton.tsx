import React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd-mobile';
import NSkeleton from './NSkeleton';

export type Props = {};
const Index: React.FC<Props> = (props) => {
  return (
    <div className={styles.video}>
      <div className={styles.box}>
        <Skeleton animated className={styles.content}></Skeleton>
      </div>
      <div style={{ marginTop: 10 }}>
        <NSkeleton count={1} />
      </div>
    </div>
  );
};

export default Index;
