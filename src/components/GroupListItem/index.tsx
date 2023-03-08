import * as React from 'react';
import styles from './index.less';
import UserAvatar from '@/components/UserAvatar';

export type Props = {};
const GroupListItem: React.FC<Props> = (props) => {
  return (
    <div className={styles.groupListItem}>
      <UserAvatar prefix={''} identifier={''} name={''} />
      <div className={styles.detail}>
        <div className={styles.nameMsg}>
          <div className={styles.name}>FavorDao</div>
          <div className={styles.msg}>hello...</div>
        </div>
        <div className={styles.time}>2023/1/1</div>
      </div>
    </div>
  );
};

export default GroupListItem;
