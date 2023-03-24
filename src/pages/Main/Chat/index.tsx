import * as React from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl, useReviteUrl, useUrl } from '@/utils/hooks';
import DaoApi from '@/services/tube/Dao';
import { useEffect, useState } from 'react';
import { DaoInfo, LastMsg } from '@/declare/tubeApiType';
import { getChatHash, getTime, toChat } from '@/utils/util';
import { Models } from '@/declare/modelType';
import ChatApi from '@/services/tube/Chat';
import { decodeTime } from 'ulid';
import { message } from 'antd';
import ChatsSkeleton from '@/components/CustomSkeleton/ChatsSkeleton';

export type Props = {};
type FocusListMap = {
  [key: number]: ChatInfo;
};
type ChatInfo = DaoInfo & {
  last_message: LastMsg;
};

const Chat: React.FC<Props> = (props) => {
  const url = useUrl();
  const reviteUrl = useReviteUrl();
  const avatarsResUrl = useResourceUrl('avatars');

  const [focusList, setFocusList] = useState<FocusListMap>({});
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const { api, config } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getFocusList = async () => {
    try {
      setFirstLoad(true);
      setListLoading(true);
      const { data } = await DaoApi.getBookmarkList(url);
      if (data.data.list) {
        const map: FocusListMap = {};
        if (userInfo)
          map[0] = {
            ...userInfo,
            last_message: { content: '', created_on: 0 },
          };
        data.data.list.forEach((item, index) => {
          map[userInfo ? index + 1 : index] = {
            ...item,
            last_message: { content: '', created_on: 0 },
          };
        });
        setFocusList(map);
        setListLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setFirstLoad(false);
    }
  };

  const getMsgIdByName = async (item: ChatInfo, index: number) => {
    const { data } = await ChatApi.getMsgIdByName(
      reviteUrl,
      getChatHash(item.name),
    );
    if (data?.last_message_id)
      getMsgById(item.name, data.last_message_id, index);
  };

  const getMsgById = async (name: string, msgId: string, index: number) => {
    const { data } = await ChatApi.getMsgById(
      reviteUrl,
      getChatHash(name),
      msgId,
    );
    setFocusList((v) => ({
      ...v,
      [index]: {
        ...v[index],
        last_message: {
          content: data.content,
          created_on: decodeTime(data._id),
        },
      },
    }));
  };

  const getLastMessage = () => {
    Object.values(focusList).forEach((item, index) => {
      getMsgIdByName(item, index);
    });
  };

  useEffect(() => {
    getFocusList();
  }, []);

  useEffect(() => {
    if (!listLoading) {
      getLastMessage();
    }
  }, [listLoading]);

  return (
    <div className={styles.groupList}>
      {firstLoad ? (
        <ChatsSkeleton />
      ) : (
        <>
          {Object.values(focusList).length === 0 && (
            <p className={styles.noData}>No data</p>
          )}
          {Object.values(focusList).map((item) => (
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
                  {item.last_message.content ? (
                    <div className={styles.msg}>
                      {item.last_message.content}
                    </div>
                  ) : (
                    <span>...</span>
                  )}
                </div>
                {item.last_message.created_on != 0 && (
                  <div className={styles.lastTime}>
                    {getTime(item.last_message.created_on)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Chat;
