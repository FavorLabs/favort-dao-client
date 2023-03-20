import * as React from 'react';
import styles from './index.less';
import noticeIcon from '@/assets/icon/noticeIcon.svg';
import { useState } from 'react';

export type Props = {};

const PluginDao: React.FC<Props> = (props) => {
  const [isInstall, setIsInstall] = useState<boolean>(false);

  return (
    <div className={styles.pageContent}>
      <div className={styles.image}>
        <img src={noticeIcon} alt="" className={styles.img} />
      </div>

      <div className={styles.center}>
        <div className={styles.title}>AMA!</div>
        <div className={styles.introduction}>
          Enable you to call Voice AMA in you DAO
        </div>
      </div>

      {!isInstall ? (
        <div className={styles.button} onClick={() => setIsInstall(true)}>
          <div className={styles.Install}>Install</div>
        </div>
      ) : (
        <div className={styles.button} onClick={() => setIsInstall(false)}>
          <div className={styles.Installed}>Installed</div>
        </div>
      )}
    </div>
  );
};

export default PluginDao;
