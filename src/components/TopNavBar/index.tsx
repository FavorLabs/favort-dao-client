import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import { ReactNode } from 'react';

type Props = {
  title: string;
  right: ReactNode;
};

const TopNavBar: React.FC<Props> = (props) => {
  const { title, right } = props;
  const history = useHistory();

  return (
    <>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
        right={<div className={styles.navRight}>{right}</div>}
      >
        {title}
      </NavBar>
    </>
  );
};

export default TopNavBar;
