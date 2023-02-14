import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { Avatar } from 'antd';

export type Props = {
  size?: number;
  avatar: any;
  daoName: string;
  address: string;
};
const Index: React.FC<Props> = (props) => {
  const { size, avatar, daoName, address } = props;
  const history = useHistory();

  const toDao = () =>
    history.push({
      pathname: `/dao/${address}`,
      query: {
        daoName,
      },
    });

  return (
    <>
      <div className={styles.cardItem}>
        <div className={styles.cardItemInner}>
          <Avatar
            size={size || 30}
            alt=""
            src={avatar}
            className={styles.daoAvatar}
            onClick={toDao}
          >
            {daoName ? daoName.toUpperCase().substr(0, 1) : 'U'}
          </Avatar>
          <p className={styles.daoName} onClick={toDao}>
            {daoName}
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
