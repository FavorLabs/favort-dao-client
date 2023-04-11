import * as React from 'react';
import styles from './index.less';
import { DaoInfo, Page } from '@/declare/tubeApiType';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import UserAvatar from '@/components/UserAvatar';
import { history, useSelector } from 'umi';
import addImg from '@/assets/icon/addCommunityIcon.svg';
import allCommunityIcon from '@/assets/icon/home.svg';
import { useEffect, useState } from 'react';
import { Models } from '@/declare/modelType';

export type Props = {
  user: DaoInfo | null;
  joinedList: DaoInfo[];
  daoId: string | undefined;
  activeId: string | undefined;
};

const MyCommunity: React.FC<Props> = (props) => {
  const { user, joinedList = [], daoId, activeId } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const allId = '12345';

  const setDaoId = (id: string) => {
    if (id === allId) {
      history.push(`/daoCommunity/`);
    } else {
      history.push(`/daoCommunity/${id}`);
    }
  };

  const onFocusCommunity = (id: string) => {
    if (activeId !== id) {
      setDaoId(id);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.my}>
        {user ? (
          <div
            className={`${styles.block} ${
              activeId === user.id ? styles.boxActive : styles.boxNoActive
            }`}
          >
            <div
              className={`${styles.imgActive} ${
                activeId === user.id ? styles.whiteBorder : styles.noBorder
              }`}
            >
              <UserAvatar
                prefix={avatarsResUrl}
                name={user.name}
                identifier={user.avatar}
                onClick={() => onFocusCommunity(user.id)}
              ></UserAvatar>
            </div>
          </div>
        ) : (
          <div
            className={styles.button}
            onClick={() => {
              history.push('/createCommunity');
            }}
          >
            <img src={addImg} className={styles.addImg} alt="" />
          </div>
        )}
      </div>

      <div
        className={`${styles.allCommunity} ${
          activeId === allId ? styles.boxActive : styles.boxNoActive
        }`}
        onClick={() => onFocusCommunity(allId)}
      >
        <div
          className={`${styles.allPadding} ${
            activeId === allId ? styles.noBorder : styles.whiteBorder
          }`}
        >
          <img src={allCommunityIcon} alt="" className={styles.allImg} />
        </div>
      </div>

      <div className={styles.joinedList}>
        {joinedList.length ? (
          joinedList.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.block} ${
                  activeId === item.id ? styles.boxActive : styles.boxNoActive
                }`}
              >
                <div
                  className={`${styles.imgActive} ${
                    activeId === item.id ? styles.whiteBorder : styles.noBorder
                  }`}
                >
                  <UserAvatar
                    shape="square"
                    prefix={avatarsResUrl}
                    name={item.name}
                    identifier={item.avatar}
                    onClick={() => onFocusCommunity(item.id)}
                    className={styles.icon}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyCommunity;
