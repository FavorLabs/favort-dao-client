import * as React from 'react';
import styles from './index.less';
import Prompt from '@/components/Prompt';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';

type Props = {
  title: string;
  promptText?: string;
  noRight?: boolean;
};

const TopNavBar: React.FC<Props> = (props) => {
  const { title, promptText, noRight } = props;
  const history = useHistory();

  return (
    <>
      {noRight ? (
        <NavBar
          className={styles.navBar}
          onBack={() => {
            history.goBack();
          }}
        >
          {title}
        </NavBar>
      ) : (
        <NavBar
          className={styles.navBar}
          onBack={() => {
            history.goBack();
          }}
          right={
            <div className={styles.navRight}>
              <Prompt />
            </div>
          }
        >
          {title}
        </NavBar>
      )}
    </>
  );
};

export default TopNavBar;
