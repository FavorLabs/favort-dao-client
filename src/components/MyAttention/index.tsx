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
  daoId: string | undefined;
};

const MyAttention: React.FC<Props> = (props) => {
  const { user, joinedList = [], daoId } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const [focus, setFocus] = useState(0);
  const idList = joinedList.map((item) => {
    return item.id;
  });
  const indexlist = Array.from(new Set([user?.id, ...idList]));

  const setDaoId = (daoId: string) => {
    history.push(`/dao/${daoId}`);
  };

  const moreHandle = () => {
    history.push(`/focusList/`);
  };

  const onFocusCommunity = (id: string) => {
    setDaoId(id);
    indexlist.map((item, index) => {
      if (daoId === item) {
        setFocus(index);
      }
    });
  };

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
                <span className={styles.text} onClick={moreHandle}>
                  more
                </span>
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
              <div className={styles.icon}>
                <UserAvatar
                  prefix={avatarsResUrl}
                  name={user.name}
                  identifier={user.avatar}
                  onClick={() => onFocusCommunity(user.id)}
                ></UserAvatar>
                <span className={styles.text}>{user.name}</span>
              </div>
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
                  <div key={index} className={`${styles.userArr}`}>
                    <div
                      className={
                        index === focus ? styles.imgActive : styles.icon
                      }
                    >
                      <UserAvatar
                        prefix={avatarsResUrl}
                        name={item.name}
                        identifier={item.avatar}
                        onClick={() => onFocusCommunity(item.id)}
                        className={styles.icon}
                      ></UserAvatar>
                    </div>
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
