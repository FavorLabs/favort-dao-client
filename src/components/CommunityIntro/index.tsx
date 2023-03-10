import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';

export type Props = {
  post: PostInfo;
};

const CommunityIntro: React.FC<Props> = (props) => {
  const { dao } = props.post;
  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');
  const handleClick = () => {
    console.log('click button');
  };
  const operate = 'view details';
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
      ></div>

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

        <button className={styles.right} onClick={handleClick}>
          {operate}
        </button>
      </div>
    </div>
  );
};

export default CommunityIntro;
