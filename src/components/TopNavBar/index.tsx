import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import { ReactNode } from 'react';
import backIcon from '@/assets/icon/back-icon.svg';

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
        backArrow={
          <img src={backIcon} alt={'backIcon'} className={styles.backIcon} />
        }
      >
        {title}
      </NavBar>
    </>
  );
};

export default TopNavBar;
