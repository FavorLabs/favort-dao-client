import * as React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd-mobile';
import CommentItemSkeleton from '@/components/CustomSkeleton/CommentSkeleton/ItemSkeleton';

export type Props = {};
const CommentSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.commentSkeleton}>
      <Skeleton animated className={styles.count} />
      <CommentItemSkeleton />
      <CommentItemSkeleton />
    </div>
  );
};

export default CommentSkeleton;
