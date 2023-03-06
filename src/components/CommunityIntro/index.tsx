import * as React from 'react';
import styles from './index.less';
import defaultImgSrc from '@/assets/img/community.png';
import defaultHeadImg from '@/assets/img/headImg.png';

export type Props = {
  title?: String;
  text?: String;
  operate?: String;
  handleClick: () => void;
};

const CommunityIntro: React.FC<Props> = (props) => {
  return (
    <div className={styles.communityCard}>
      <div className={styles.head}>
        <img src={defaultImgSrc} alt="" />
      </div>

      <div className={styles.foot}>
        <div className={styles.left}>
          <img src={defaultHeadImg} alt="" />
          <p className={styles.title}>{props.title}</p>
          <p className={styles.text}>{props.text}</p>
        </div>

        <div className={styles.right}>
          <button onClick={props.handleClick}>{props.operate}</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityIntro;
