import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';

export type Props = {
  userImg?: string;
};

const CommunityInfo: React.FC<Props> = (props) => {
  const { userImg } = props;

  return (
    <>
      <div className={styles.userInfo}>
        <Avatar src={userImg} className={styles.userImg}></Avatar>
        <div className={styles.userText}>
          <p className={styles.userName}>FavorDao</p>
          <p className={styles.releaseTime}>today 08:23</p>
        </div>
      </div>
    </>
  );
};

export default CommunityInfo;
