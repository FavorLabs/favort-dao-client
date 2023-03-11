import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory, useSelector } from 'umi';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import DaoApi from '@/services/tube/Dao';
import { useEffect, useState } from 'react';
import { DaoInfo } from '@/declare/tubeApiType';
import { toChat } from '@/utils/util';
import { Models } from '@/declare/modelType';

export type Props = {};
const GroupList: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();
  const avatarsResUrl = useResourceUrl('avatars');

  const [focusList, setFocusList] = useState<DaoInfo[]>([]);

  const { api, config } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getFocusList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) {
      setFocusList(data.data.list);
    }
  };

  useEffect(() => {
    getFocusList();
  }, []);

  return (
    <div className={styles.groupList}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Group Chats
      </NavBar>
      {focusList.map((item) => (
        <div
          className={styles.groupListItem}
          key={item.id}
          onClick={() => {
            toChat(item.name, api, config?.proxyGroup);
          }}
        >
          <UserAvatar
            prefix={avatarsResUrl}
            identifier={item.avatar}
            name={item.name}
          />
          <div className={styles.detail}>
            <div className={styles.nameMsg}>
              <div className={styles.name}>{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
