import * as React from 'react';
import styles from './index.less';
import { history } from 'umi';

export type Props = {};
import _404Img from '@/assets/img/404.png';

const _404: React.FC = () => {
  const goBack = (): void => {
    history.push('/');
  };
  return (
    <div className={styles.notFind}>
      <img src={_404Img} alt="" />
      <span className={styles.tip}>
        Your page was robbed by other public chains～
      </span>
      <span className={styles.back} onClick={goBack}>
        Return to home page
      </span>
    </div>
  );
};
export default _404;
