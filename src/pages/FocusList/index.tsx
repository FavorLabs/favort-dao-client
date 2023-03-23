import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { NavBar, Dialog } from 'antd-mobile';
import { useHistory } from 'umi';
import UserAvatar from '@/components/UserAvatar';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import DaoApi from '@/services/tube/Dao';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { message } from 'antd';
import { DaoInfo } from '@/declare/tubeApiType';

export type Props = {};
const FocusList: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');

  const [focusList, setFocusList] = useState<DaoInfo[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [currentDaoId, setCurrentDaoId] = useState<string>('');

  const getFocusList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) {
      setFocusList(data.data.list);
    }
  };

  const confirmHandle = async () => {
    try {
      const { data } = await DaoApi.bookmark(url, currentDaoId);
      setRefresh(!refresh);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDialogVisible(false);
    }
  };

  useEffect(() => {
    getFocusList();
  }, [refresh]);

  return (
    <div className={styles.focusList}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Joined
      </NavBar>
      <div className={styles.focusItemList}>
        {focusList.map((item) => (
          <div className={styles.focusItem} key={item.id}>
            <UserAvatar
              prefix={avatarsResUrl}
              identifier={item.avatar}
              name={item.name}
            />
            <div className={styles.detail}>
              <div className={styles.text}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.desc}>{item.introduction}</div>
              </div>
              <div
                className={styles.action}
                onClick={() => {
                  setCurrentDaoId(item.id);
                  setDialogVisible(true);
                }}
              >
                Joined
              </div>
            </div>
          </div>
        ))}
      </div>
      <ExitCommunityDialog
        text={'Confirm your withdrawal from this DAO?'}
        visible={dialogVisible}
        closeDialog={() => {
          setDialogVisible(false);
        }}
        confirmHandle={confirmHandle}
      />
    </div>
  );
};

export default FocusList;
