import * as React from 'react';
import styles from './index.less';
import promptIcon from '@/assets/icon/prompt-icon.svg';
import { useState } from 'react';
import { Popup } from 'antd-mobile';

export type Props = {};

const Prompt: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.page}>
      <img
        src={promptIcon}
        className={styles.prompt}
        onClick={() => setVisible(true)}
      />

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          <div className={styles.info}>
            Directly select Web3 users from FavorDAO system users for airdrop,
            the airdrop will directly enter the Web3 user’s account, and will
            generate notification reminders in FavorDAO
          </div>
          <div className={styles.button} onClick={() => setVisible(false)}>
            I Know
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Prompt;
