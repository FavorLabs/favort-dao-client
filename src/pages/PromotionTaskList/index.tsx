import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { NavBar } from 'antd-mobile';
import PromotionTask from '@/components/PromotionTask';
import Prompt from '@/components/Prompt';

export type Props = {};

const PromotionTaskList: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <div className={styles.pluginForDAOs}>
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
        Promotion Tasks
      </NavBar>
      <div className={styles.content}>
        <PromotionTask />
        <PromotionTask />
        <PromotionTask />
        <PromotionTask />
        <PromotionTask />
      </div>
    </div>
  );
};

export default PromotionTaskList;
