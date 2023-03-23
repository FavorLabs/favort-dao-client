import * as React from 'react';
import styles from './index.less';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import UserAvatar from '@/components/UserAvatar';
import { history } from 'umi';
import addImg from '@/assets/icon/addCommunityIcon.svg';
import allCommunityIcon from '@/assets/icon/home.svg';

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
          <div className={styles.block}>
            <div
              className={`${styles.imgActive} ${
                activeId === user.id ? styles.boxActive : styles.boxNoActive
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
        <img src={allCommunityIcon} alt="" className={styles.allImg} />
      </div>

      <div className={styles.joinedList}>
        {joinedList.length ? (
          joinedList.map((item, index) => {
            return (
              <div key={index} className={styles.block}>
                <div
                  className={`${styles.imgActive} ${
                    activeId === item.id ? styles.boxActive : styles.boxNoActive
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

      {/*<div className={styles.viewMore}>*/}
      {/*  {isViewDaoGroup ? (*/}
      {/*    <img*/}
      {/*      src={viewMoreOn}*/}
      {/*      className={styles.img}*/}
      {/*      onClick={() => {*/}
      {/*        viewDaoGroup();*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ) : (*/}
      {/*    <img*/}
      {/*      src={viewMore}*/}
      {/*      className={styles.img}*/}
      {/*      onClick={() => {*/}
      {/*        viewDaoGroup();*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default MyCommunity;
