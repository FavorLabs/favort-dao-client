import * as React from 'react';
import styles from './index.less';
import { Switch } from 'antd-mobile';

export type Props = {
  beforeText: string;

  afterText: string;
  status: boolean;
  setStatus: (status: boolean) => void;
};

const DaoSwitch: React.FC<Props> = (props) => {
  const { beforeText, afterText, status, setStatus } = props;
  return (
    <div className={styles.page}>
      <div className={styles.switch}>
        <p className={`${status ? styles.select : styles.unSelect}`}>
          {beforeText}
        </p>
        <Switch
          defaultChecked
          style={{
            '--checked-color': 'rgba(255, 166, 0, 1)',
            '--height': '1.375rem',
            '--width': '2.75rem',
          }}
          className={`${styles.switchButton} switchButton`}
          onChange={() => setStatus(!status)}
        />
        <p className={`${!status ? styles.select : styles.unSelect}`}>
          {afterText}
        </p>
      </div>
    </div>
  );
};

export default DaoSwitch;
