import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';
import { DaoInfo } from '@/declare/tubeApiType';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl } from '@/utils/hooks';
import { getTime } from '@/utils/util';
import { history, useSelector } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';
import { Models } from '@/declare/modelType';

export type Props = {
  daoInfo: DaoInfo;
  createTime: number;
  // type?: number;
  // dao?: DaoInfo;
};

const CommunityInfo: React.FC<Props> = (props) => {
  const { avatar = '', name = '', id } = props.daoInfo || {};
  // const { type, dao } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(props.createTime);
  const intl = useIntl();
  const { userInfo } = useSelector((state: Models) => state.dao);

  const handleClick = (daoId: string | undefined) => {
    history.push(`/daoCommunity/${daoId}`);
  };

  return (
    <>
      <div className={styles.userInfo}>
        <UserAvatar
          className={styles.userImg}
          prefix={avatarsResUrl}
          identifier={avatar}
          name={name}
          onClick={() => handleClick(id)}
        />
        <div className={styles.userText}>
          <div className={styles.userName}>
            <div onClick={() => handleClick(id)}>{name}</div>
          </div>
          <p className={styles.releaseTime}>{createTime}</p>
        </div>
      </div>
    </>
  );
};

export default CommunityInfo;
