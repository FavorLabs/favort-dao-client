import * as React from 'react';
import styles from './index.less';
import { ReactNode, useRef, useState } from 'react';
import { useDispatch, useHistory, useSelector } from 'umi';
import LogoutDialog from '@/components/LogoutDialog';
import { checkLogin, getDebounce } from '@/utils/util';
import { Models } from '@/declare/modelType';

export type Props = {
  content: ReactNode;
};
const Children: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const { scrollPosition } = useSelector((state: Models) => state.manage);

  const loginStatus = checkLogin();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  const childrenRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={'TSL_children'}
      ref={childrenRef}
      className={`
      ${styles.content} ${pathname === '/mine' ? styles.mine : ''} ${
        route === 'daoCommunity'
          ? styles.dao
          : route === 'chat' || route === 'mine'
          ? styles.chat
          : ''
      }`}
      onScroll={getDebounce(() => {
        if (pathname === '/latest/recommend') {
          dispatch({
            type: 'manage/updateState',
            payload: {
              scrollPosition: {
                ...scrollPosition,
                recommend: childrenRef.current?.scrollTop,
              },
            },
          });
        } else if (pathname === '/latest/follow') {
          dispatch({
            type: 'manage/updateState',
            payload: {
              scrollPosition: {
                ...scrollPosition,
                joined: childrenRef.current?.scrollTop,
              },
            },
          });
        }
      })}
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
