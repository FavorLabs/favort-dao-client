import * as React from 'react';
import styles from './index.less';
import { useResourceUrl } from '@/utils/hooks';
import UserAvatar from '@/components/UserAvatar';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { DaoInfo } from '@/declare/tubeApiType';
import SvgIcon from '@/components/SvgIcon';
import joinedImg from '@/assets/icon/joinedNumber.svg';
import { Popup } from 'antd-mobile';
import { useState } from 'react';
import { history } from '@@/core/history';

export type Props = {
  daoInfo: DaoInfo | null;
};

const FavorDaoCard: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.page}>
      {daoInfo ? (
        <div className={styles.content} onClick={() => setVisible(true)}>
          <div className={styles.avatars}>
            <UserAvatar
              prefix={avatarsResUrl}
              name={daoInfo.name}
              identifier={daoInfo.avatar}
            ></UserAvatar>
          </div>
          <div className={styles.name}>{daoInfo.name}</div>
          <div className={styles.joinedNumber}>
            <div className={styles.svg}>
              <SvgIcon svg={joinedImg} />
            </div>
            <span className={styles.text}>{daoInfo.follow_count}</span>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '20px',
          boxSizing: 'border-box',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      >
        <div className={styles.popupContent}>
          <div className={styles.card}>
            <div
              className={styles.bg}
              style={{
                backgroundImage: `url(${imagesResUrl}/${daoInfo?.banner})`,
                backgroundSize: `100%`,
                backgroundPosition: `center center`,
              }}
            />
            <div className={styles.foot}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <img
                    className={styles.img}
                    src={`${avatarsResUrl}/${daoInfo?.avatar}`}
                    alt=""
                  />
                  <p className={styles.title}>{daoInfo?.name}</p>
                </div>
                {/*<p className={styles.text}>{user?.introduction}</p>*/}
              </div>
              <div className={styles.joined}>
                <div className={styles.svg}>
                  <SvgIcon svg={joinedImg} />
                </div>
                <span className={styles.text}>{daoInfo?.follow_count}</span>
              </div>
            </div>
          </div>
          <div className={styles.introduction}>
            <div className={styles.title}>Introduction</div>
            <span className={styles.text}>{daoInfo?.introduction}</span>
          </div>
          <div
            className={styles.button}
            onClick={() => {
              setVisible(false);
              history.push(`/daoCommunity/${daoInfo?.id}`);
            }}
          >
            Join
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default FavorDaoCard;
