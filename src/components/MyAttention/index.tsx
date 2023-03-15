import * as React from 'react';
import styles from './index.less';
import arrowRight from '@/assets/img/arrow_right.png';
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

  const setDaoId = (daoId: string) => {
    history.push(`/dao/${daoId}`);
  };

  const moreHandle = () => {
    history.push(`/focusList/`);
  };

  const onFocusCommunity = (id: string) => {
    if (daoId !== id) {
      setDaoId(id);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.navLeft}>
          <div className={styles.top}>
            <span className={styles.text}>My</span>
          </div>
          <div className={styles.bottom}>
            {user ? (
              <div className={styles.block}>
                <div
                  className={user.id === daoId ? styles.imgActive : styles.icon}
                >
                  <UserAvatar
                    prefix={avatarsResUrl}
                    name={user.name}
                    identifier={user.avatar}
                    onClick={() => onFocusCommunity(user.id)}
                  ></UserAvatar>
                </div>
                {/*<span className={styles.text}>{user.name}</span>*/}
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
        </div>

        <div className={styles.verticalLine}></div>

        <div className={styles.navRight}>
          <div className={styles.top}>
            <span className={styles.leftText}>Joined</span>
            {joinedList.length ? (
              <div className={styles.right}>
                <span className={styles.text} onClick={moreHandle}>
                  more
                </span>
                <img src={arrowRight} className={styles.icon} />
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.bottom}>
            {joinedList.length ? (
              joinedList.map((item, index) => {
                return (
                  <div key={index} className={styles.block}>
                    <div
                      className={
                        item.id === daoId ? styles.imgActive : styles.icon
                      }
                    >
                      <UserAvatar
                        prefix={avatarsResUrl}
                        name={item.name}
                        identifier={item.avatar}
                        onClick={() => onFocusCommunity(item.id)}
                        className={styles.icon}
                      />
                    </div>
                    {/*<span className={styles.text}>{item.name.trim()}</span>*/}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttention;
