import * as React from 'react';
import styles from './index.less';
import { Dialog } from 'antd-mobile';

export type Props = {
  text: string;
  visible: boolean;
  closeDialog: () => void;
  confirmHandle: () => void;
};
const ExitCommunityDialog: React.FC<Props> = (props) => {
  const { visible, closeDialog, confirmHandle, text } = props;

  return (
    <div className={styles.exitCommunity}>
      <Dialog
        visible={visible}
        content={
          <div className={styles.dialog}>
            <div className={styles.text}>{props.text}</div>
            <div className={styles.actions}>
              <span className={styles.cancel} onClick={closeDialog}>
                cancel
              </span>
              <span className={styles.confirm} onClick={confirmHandle}>
                confirm
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ExitCommunityDialog;
