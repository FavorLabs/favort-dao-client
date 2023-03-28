import * as React from 'react';
import styles from './index.less';
import PromotionTask from '@/components/PromotionTask';
import TopNavBar from '@/components/TopNavBar';

export type Props = {};

const PromotionTaskList: React.FC<Props> = (props) => {
  return (
    <div className={styles.pluginForDAOs}>
      <TopNavBar title={'Promotion Tasks'} />
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
