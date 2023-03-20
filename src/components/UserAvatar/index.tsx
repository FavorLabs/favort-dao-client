import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';
import { AvatarProps } from 'antd';
import { avatarSize } from '@/config/constants';

export type Props = AvatarProps & {
  prefix: string;
  identifier: string;
  name: string;
  shape?: string;
};
const UserAvatar: React.FC<Props> = (props) => {
  const { prefix, identifier, name, shape } = props;
  const alternativeText = name?.[0]?.toUpperCase();
  // console.log(identifier && `${prefix}/${identifier}`);

  return (
    <div className={styles.content}>
      {shape ? (
        <Avatar
          shape="square"
          {...props}
          alt={alternativeText}
          src={identifier && `${prefix}/${identifier + avatarSize}`}
          className={`${styles.userAvatar} ${styles.square} ${
            props.size ? '' : 'userAvatar'
          }`}
        >
          <span className={styles.text}>{alternativeText}</span>
        </Avatar>
      ) : (
        <Avatar
          {...props}
          alt={alternativeText}
          src={identifier && `${prefix}/${identifier + avatarSize}`}
          className={`${styles.userAvatar} ${props.size ? '' : 'userAvatar'}`}
        >
          <span className={styles.text}>{alternativeText}</span>
        </Avatar>
      )}
    </div>
  );
};

export default UserAvatar;
