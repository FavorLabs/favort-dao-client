import * as React from 'react';
import styles from './index.less';
import { useState } from 'react';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import PostList from '@/components/PostList';
import { checkLogin } from '@/utils/util';
import LogoutDialog from '@/components/LogoutDialog';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  const loginStatus = checkLogin();

  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  useActivate(() => {
    setLogoutDialog(false);
    // console.log('recommend activate');
  });

  useUnactivate(() => {
    // console.log('recommend unActivate');
  });

  return (
    <div className={styles.recommend}>
      <PostList />
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

export default () => {
  return (
    // @ts-ignore
    <KeepAlive when={true} saveScrollPosition={'screen'}>
      <Recommend />
    </KeepAlive>
  );
};
