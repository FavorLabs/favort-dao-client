import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import DaoApi from '@/services/tube/Dao';
import { useState } from 'react';
import { history } from '@@/core/history';

export type Props = {
  post: PostInfo;
};

const CommunityIntro: React.FC<Props> = (props) => {
  const { dao } = props.post;
  if (!dao) return <></>;
  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');

  const handleClick = (daoId: string) => {
    history.push(`/dao/${daoId}`);
  };
  const operate = 'details';
  return (
    <div className={styles.communityCard}>
      <div
        className={styles.head}
        style={{
          background: dao.banner
            ? `url(${imagesResUrl}/${dao.banner})`
            : `rgba(240, 240, 240, 1)`,
          backgroundSize: `100%`,
          backgroundPosition: `center center`,
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
          <p className={styles.text}>{dao.introduction}</p>
        </div>

        <button className={styles.right} onClick={() => handleClick(dao.id)}>
          {operate}
        </button>
      </div>
    </div>
  );
};

export default CommunityIntro;
