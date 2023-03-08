import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import GroupListItem from '@/components/GroupListItem';

export type Props = {};
const GroupList: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <div className={styles.groupList}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Group Chat
      </NavBar>
      <GroupListItem />
    </div>
  );
};

export default GroupList;
