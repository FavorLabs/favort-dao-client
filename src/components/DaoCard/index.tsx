import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { Avatar } from 'antd';

export type Props = {
  size?: number;
  avatar: any;
  daoName: string;
  address: string;
  action: 'dao' | 'chat';
};
const Index: React.FC<Props> = (props) => {
  const { size, avatar, daoName, address, action } = props;
  const history = useHistory();

  const clickHandle = () => {
    switch (action) {
      case 'dao':
        history.push({
          pathname: `/dao/${address}`,
          // @ts-ignore
          query: { daoName },
        });
        break;
      case 'chat':
        window.open('https://github.com', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.cardItem}>
        <div className={styles.cardItemInner}>
          <Avatar
            size={size || 30}
            alt=""
            src={avatar}
            className={styles.daoAvatar}
            onClick={clickHandle}
          >
            {daoName ? daoName.toUpperCase().substr(0, 1) : 'U'}
          </Avatar>
          <p className={styles.daoName} onClick={clickHandle}>
            {daoName}
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
