import * as React from 'react';
import styles from './index.less';
import { ReactNode, useState } from 'react';

export type Props = {
  icon: ReactNode;
  title: string;
  text: string;
};

const PluginDao: React.FC<Props> = (props) => {
  const { icon, title, text } = props;
  const [isInstall, setIsInstall] = useState<boolean>(false);

  return (
    <div className={styles.pageContent}>
      <div className={styles.image}>{icon}</div>

      <div className={styles.center}>
        <div className={styles.title}>{title}</div>
        <div className={styles.introduction}>{text}</div>
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
