import * as React from 'react';
import styles from './index.less';
import promotionAvatar from '@/assets/icon/promotionAvator.svg';
import favorIcon from '@/assets/icon/favor-icon.svg';
import twitterIcon from '@/assets/icon/twitter-icon.svg';
import youTubeIcon from '@/assets/icon/youtube-icon.svg';
import facebookIcon from '@/assets/icon/facebook-icon.svg';

export type Props = {};

const PromotionTask: React.FC<Props> = (props) => {
  return (
    <div className={styles.promotionTasks}>
      <div className={styles.taskTop}>
        <div className={styles.taskInfo}>
          <img src={promotionAvatar} alt="" className={styles.avatar} />
          <div className={styles.right}>
            <p className={styles.title}>Phala Project</p>
            <p className={styles.text}>
              Phala is a decentgralieadfad, this is test text,hello miss k,what
              are you doing?i like eat apple
            </p>
          </div>
        </div>

        <div className={styles.taskAmount}>
          <div className={styles.block}>
            <p className={styles.text}>Total</p>
            <p className={styles.amount}>500,000</p>
          </div>
          <div className={styles.block}>
            <p className={styles.text}>Remains</p>
            <p className={styles.amount}>500,000</p>
          </div>
          <div className={styles.block}>
            <p className={styles.text}>Price</p>
            <p className={styles.amount}>500,000</p>
          </div>
        </div>
      </div>

      <div className={styles.taskBottom}>
        <div className={styles.left}>
          <img src={favorIcon} className={styles.image} />
          <img src={twitterIcon} className={styles.image} />
          <img src={youTubeIcon} className={styles.image} />
          <img src={facebookIcon} className={styles.image} />
        </div>
        <div className={styles.rightButton}>accept</div>
      </div>
    </div>
  );
};

export default PromotionTask;
