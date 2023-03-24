import * as React from 'react';
import styles from './index.less';
import AvatarSkeleton from '@/components/CustomSkeleton/AvatarSkeleton';
import { Skeleton } from 'antd-mobile';

export type Props = {};
const ChatsSkeleton: React.FC<Props> = (props) => {
  return (
    <div className={styles.chatsSkeleton}>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <div className={styles.chatsItem} key={item}>
          <AvatarSkeleton size={'2.375rem'} />
          <div className={styles.info}>
            <div className={styles.nameMsg}>
              <Skeleton animated className={styles.name} />
              <Skeleton animated className={styles.msg} />
            </div>
            <Skeleton animated className={styles.lastTime} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsSkeleton;
