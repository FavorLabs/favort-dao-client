import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import DaoApi from '@/services/tube/Dao';
import { useState } from 'react';
import { history } from 'umi';
import { ImageMaxSize } from '@/config/constants';
import SvgIcon from '@/components/SvgIcon';
import joinedImg from '@/assets/icon/joinedNumber.svg';
import { Popup } from 'antd-mobile';

export type Props = {
  post: PostInfo;
};

const CommunityIntro: React.FC<Props> = (props) => {
  const { dao } = props.post;
  if (!dao) return <></>;
  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');
  const [visible, setVisible] = useState(false);

  const handleClick = (daoId: string) => {
    setVisible(false);
    history.push(`/daoCommunity/${daoId}`);
  };
  return (
    <div className={styles.communityCard} onClick={() => setVisible(true)}>
      <div
        className={styles.head}
        style={{
          background: dao.banner
            ? `url(${imagesResUrl}/${dao.banner + ImageMaxSize})`
            : `rgba(240, 240, 240, 1)`,
          // backgroundSize: `100%`,
          backgroundPosition: `center center`,
          backgroundRepeat: `no-repeat`,
        }}
      />

      <div className={styles.foot}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.avatarLeft}>
              <img
                className={styles.img}
                src={`${avatarsResUrl}/${dao.avatar}`}
                alt=""
              />
              <p className={styles.title}>{dao.name}</p>
            </div>
            <div className={styles.joinedNumber}>
              <div className={styles.svg}>
                <img src={joinedImg} alt="" className={styles.img} />
              </div>
              <span className={styles.text}>{dao?.follow_count}</span>
            </div>
          </div>
        </div>
        <p className={styles.bottomText}>{dao.introduction}</p>
      </div>

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
        }}
      >
        <div className={styles.popupContent}>
          <div className={styles.card}>
            <div
              className={styles.bg}
              style={{
                backgroundImage: `url(${imagesResUrl}/${dao.banner})`,
                backgroundSize: `100%`,
                backgroundPosition: `center center`,
                backgroundRepeat: `no-repeat`,
              }}
            />
            <div className={styles.foot}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <img
                    className={styles.img}
                    src={`${avatarsResUrl}/${dao.avatar}`}
                    alt=""
                  />
                  <p className={styles.title}>{dao.name}</p>
                </div>
              </div>
              <div className={styles.joined}>
                <div className={styles.svg}>
                  {/*<SvgIcon svg={joinedImg} />*/}
                  <img src={joinedImg} alt="" className={styles.img} />
                </div>
                <span className={styles.text}>{dao.follow_count}</span>
              </div>
            </div>
          </div>
          <div className={styles.introduction}>
            <div className={styles.title}>Introduction</div>
            <span className={styles.text}>{dao.introduction}</span>
          </div>
          <div className={styles.button} onClick={() => handleClick(dao.id)}>
            View
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CommunityIntro;
