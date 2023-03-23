import * as React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd-mobile';

export type Props = {
  size: string;
};
const AvatarSkeleton: React.FC<Props> = (props) => {
  const { size } = props;

  return (
    <div className={styles.avatarSkeleton}>
      <Skeleton
        animated
        className={styles.avatar}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default AvatarSkeleton;
