import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';
import { AvatarProps } from 'antd';

export type Props = AvatarProps & {
  prefix: string;
  identifier: string;
  name: string;
};
const UserAvatar: React.FC<Props> = (props) => {
  const { prefix, identifier, name } = props;
  const alternativeText = name?.[0]?.toUpperCase();
  // console.log(identifier && `${prefix}/${identifier}`);

  return (
    <div className={styles.content}>
      <Avatar
        {...props}
        alt={alternativeText}
        src={identifier && `${prefix}/${identifier}`}
        className={`${styles.userAvatar} ${props.size ? '' : 'userAvatar'}`}
      >
        <span className={styles.text}>{alternativeText}</span>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
