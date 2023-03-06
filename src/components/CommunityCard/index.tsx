import * as React from 'react';
import styles from './index.less';

export type Props = {
  bgImg?: string;
};

const CommunityCard: React.FC<Props> = (props) => {
  const { bgImg } = props;
  return (
    <div className={styles.page}>
      <div
        className={styles.content}
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: `100%`,
          backgroundPosition: `center center`,
        }}
      >
        <div className={styles.bottom}>
          <p className={styles.textLeft}>communityProfile: xxxx</p>
          <div className={styles.textRight}>joined</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
