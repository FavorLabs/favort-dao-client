import * as React from 'react';
import styles from './index.less';
import { ReactNode, useState } from 'react';
import { useHistory } from 'umi';
import LogoutDialog from '@/components/LogoutDialog';
import { checkLogin } from '@/utils/util';

export type Props = {
  content: ReactNode;
};
const Children: React.FC<Props> = (props) => {
  const history = useHistory();
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const loginStatus = checkLogin();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];

  return (
    <div
      className={`
      ${styles.content} ${pathname === '/mine' ? styles.mine : ''} ${
        route === 'daoCommunity'
          ? styles.dao
          : route === 'chat' || route === 'mine'
          ? styles.chat
          : ''
      }`}
    >
      {props.content}
      {!loginStatus && (
        <div
          className={styles.mask}
          onClick={() => {
            setLogoutDialog(true);
          }}
        />
      )}
      <div className="logoutDialog">
        <LogoutDialog
          visible={logoutDialog}
          closeDialog={() => {
            setLogoutDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default Children;
