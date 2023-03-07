import * as React from 'react';
import styles from './index.less';

export type Props = {
  title?: string;
  text?: string;
  operate?: string;
  handleClick: () => void;
  communityImg?: string;
  communityBackgroundImg?: string;
};

const CommunityIntro: React.FC<Props> = (props) => {
  const {
    title,
    text,
    operate,
    handleClick,
    communityBackgroundImg,
    communityImg,
  } = props;
  return (
    <div className={styles.communityCard}>
      <div
        className={styles.head}
        style={{
          backgroundImage: `url(${communityBackgroundImg})`,
          backgroundSize: `100%`,
          backgroundPosition: `center center`,
        }}
      ></div>

      <div className={styles.foot}>
        <div className={styles.left}>
          <div className={styles.top}>
            <img className={styles.img} src={communityImg} alt="" />
            <p className={styles.title}>{title}</p>
          </div>
          <p className={styles.text}>{text}</p>
        </div>

        <button className={styles.right} onClick={handleClick}>
          {operate}
        </button>
      </div>
    </div>
  );
};

export default CommunityIntro;
