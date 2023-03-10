import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';
import { DaoInfo } from '@/declare/tubeApiType';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl } from '@/utils/hooks';
import { getTime } from '@/utils/util';

export type Props = {
  daoInfo: DaoInfo;
  createTime: number;
};

const CommunityInfo: React.FC<Props> = (props) => {
  const { avatar = '', name = '' } = props.daoInfo || {};
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(props.createTime);

  return (
    <>
      <div className={styles.userInfo}>
        <UserAvatar
          className={styles.userImg}
          prefix={avatarsResUrl}
          identifier={avatar}
          name={name}
        />
        <div className={styles.userText}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.releaseTime}>{createTime}</p>
        </div>
      </div>
    </>
  );
};

export default CommunityInfo;
