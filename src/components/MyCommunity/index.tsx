import * as React from 'react';
import styles from './index.less';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import UserAvatar from '@/components/UserAvatar';
import { history } from 'umi';
import addImg from '@/assets/img/add-img.png';
import viewMore from '@/assets/img/viewMore.png';
import viewMoreOn from '@/assets/img/viewMore_on.png';

export type Props = {
  user: DaoInfo | null;
  joinedList: DaoInfo[];
  daoId: string | undefined;
  viewDaoGroup: () => void;
  isViewDaoGroup: boolean;
};

const MyCommunity: React.FC<Props> = (props) => {
  const { user, joinedList = [], daoId, viewDaoGroup, isViewDaoGroup } = props;
  const avatarsResUrl = useResourceUrl('avatars');

  const setDaoId = (daoId: string) => {
    history.push(`/daoCommunity/${daoId}`);
  };

  const onFocusCommunity = (id: string) => {
    if (daoId !== id) {
      setDaoId(id);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.my}>
        {user ? (
          <div className={styles.block}>
            <div className={user.id === daoId ? styles.imgActive : styles.icon}>
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

      <div className={styles.bottomLine}></div>

      <div className={styles.joinedList}>
        {joinedList.length ? (
          joinedList.map((item, index) => {
            return (
              <div key={index} className={styles.block}>
                <div
                  className={item.id === daoId ? styles.imgActive : styles.icon}
                >
                  <UserAvatar
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

      <div className={styles.bottomLine}></div>

      <div className={styles.viewMore}>
        {isViewDaoGroup ? (
          <img
            src={viewMoreOn}
            className={styles.img}
            onClick={() => {
              viewDaoGroup();
            }}
          />
        ) : (
          <img
            src={viewMore}
            className={styles.img}
            onClick={() => {
              viewDaoGroup();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyCommunity;
