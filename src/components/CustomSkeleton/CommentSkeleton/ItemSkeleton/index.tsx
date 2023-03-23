import * as React from 'react';
import styles from './index.less';
import AvatarSkeleton from '@/components/CustomSkeleton/AvatarSkeleton';
import { Skeleton } from 'antd-mobile';

export type Props = {};
const CommentItemSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.commentItemSkeleton}>
      <AvatarSkeleton size={'2.375rem'} />
      <div className={styles.info}>
        <Skeleton animated className={styles.name} />
        <Skeleton animated className={styles.time} />
        <Skeleton.Paragraph animated lineCount={3} />
      </div>
    </div>
  );
};

export default CommentItemSkeleton;
