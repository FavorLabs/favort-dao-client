import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { Dialog } from 'antd-mobile';

export type Props = {
  visible: boolean;
  closeDialog?: () => void;
};
const LogoutDialog: React.FC<Props> = (props) => {
  const { visible, closeDialog } = props;
  const history = useHistory();

  return (
    <div className={styles.logoutDialog}>
      <Dialog
        visible={visible}
        content={
          <div className={styles.dialog}>
            <div className={styles.text}>Current operation requires login!</div>
            <div className={styles.actions}>
              <span
                className={styles.cancel}
                onClick={() => {
                  if (history.location.pathname === '/latest/recommend') {
                    closeDialog?.();
                  } else {
                    history.goBack();
                  }
                }}
              >
                cancel
              </span>
              <span
                className={styles.confirm}
                onClick={() => {
                  closeDialog?.();
                  history.push('/login');
                }}
              >
                confirm
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LogoutDialog;
