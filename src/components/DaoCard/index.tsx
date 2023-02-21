import * as React from 'react';
import styles from './index.less';
import { Avatar } from 'antd';

export type Props = {
  avatar: any;
  name?: string;
  clickHandle: () => void;
};
const Index: React.FC<Props> = (props) => {
  const { avatar, name = 'U', clickHandle } = props;

  return (
    <>
      <div className={styles.card} onClick={clickHandle}>
        <Avatar size={40} alt="" src={avatar} className={styles.avatar}>
          {name[0].toUpperCase()}
        </Avatar>
        <p className={styles.name}>{name}</p>
      </div>
    </>
  );
};

export default Index;
