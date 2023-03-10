import * as React from 'react';
import styles from './index.less';
import { Dialog } from 'antd-mobile';

export type Props = {
  visible: boolean;
  closeDialog: () => void;
  confirmHandle: () => void;
};
const ExitCommunityDialog: React.FC<Props> = (props) => {
  const { visible, closeDialog, confirmHandle } = props;

  return (
    <div className={styles.exitCommunity}>
      <Dialog
        visible={visible}
        content={
          <div className={styles.dialog}>
            <div className={styles.text}>
              Confirm your withdrawal from this community?
            </div>
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
