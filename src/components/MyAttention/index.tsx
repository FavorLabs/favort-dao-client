import * as React from 'react';
import styles from './index.less';
import { Avatar, Image } from 'antd';
import arrowRight from '@/assets/img/arrow_right.png';
import { useState } from 'react';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import UserAvatar from '@/components/UserAvatar';
import { history } from '@@/core/history';
import addImg from '@/assets/img/add-img.png';

export type Props = {
  user: DaoInfo | null;
  joinedList: DaoInfo[];
  setDaoId: (daoId: string) => void;
  daoId: string | undefined;
};

const MyAttention: React.FC<Props> = (props) => {
  const { user, joinedList = [], setDaoId, daoId } = props;
  const avatarsResUrl = useResourceUrl('avatars');

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            {user ? (
              <span className={styles.text}>My DAO</span>
            ) : (
              <span className={styles.text}>Create DAO</span>
            )}
            <span className={styles.text}>My Joined</span>
          </div>
          <div className={styles.navRight}>
            {joinedList.length ? (
              <div>
                <span className={styles.text}>more</span>
                <img src={arrowRight} className={styles.icon} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className={styles.bottomNav}>
          <div className={styles.myCreated}>
            {user ? (
              <>
                <UserAvatar
                  prefix={avatarsResUrl}
                  name={user.name}
                  identifier={user.avatar}
                  onClick={() => setDaoId(user.id)}
                ></UserAvatar>
                <span className={styles.text}>{user.name}</span>
              </>
            ) : (
              <>
                <div
                  className={styles.button}
                  onClick={() => {
                    history.push('/createCommunity');
                  }}
                >
                  <img src={addImg} className={styles.addImg} alt="" />
                </div>
              </>
            )}
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.myJoin}>
            {joinedList.length ? (
              joinedList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.userArr}`}
                    onClick={() => {
                      setDaoId(item.id);
                    }}
                  >
                    <UserAvatar
                      prefix={avatarsResUrl}
                      name={item.name}
                      identifier={item.avatar}
                      onClick={() => setDaoId(item.id)}
                      className={styles.icon}
                    ></UserAvatar>
                    <span className={styles.text}>{item.name}</span>
                  </div>
                );
              })
            ) : (
              <>
                <div className={styles.button}>
                  <img src={addImg} className={styles.addImg} alt="" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttention;
