import * as React from 'react';
import styles from './index.less';
import promotionAvatar from '@/assets/icon/promotionAvator.svg';
import favorIcon from '@/assets/icon/favor-icon.svg';
import twitterIcon from '@/assets/icon/twitter-icon.svg';
import youTubeIcon from '@/assets/icon/youtube-icon.svg';
import facebookIcon from '@/assets/icon/facebook-icon.svg';
import metaIcon from '@/assets/icon/meta-icon.svg';
import { Input } from 'antd';
import { Popup } from 'antd-mobile';
import { useState } from 'react';

export type Props = {
  status?: string;
};

const PromotionTask: React.FC<Props> = (props) => {
  const { status } = props;
  const [visible, setVisible] = useState(false);

  const clickButton = () => {
    switch (status) {
      case 'Pending':
        break;
      case 'OnGoing':
        setVisible(true);
        break;
      case 'Finished':
        break;
    }
  };

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
            <p className={styles.text}>Rewards of me</p>
            <p className={styles.orangeNum}>500,000</p>
          </div>
        </div>
      </div>

      <div className={styles.share}>
        <p className={styles.left}>Link to Share</p>
        <div className={styles.right}>
          <Input className={styles.input} placeholder="please input" />
        </div>
      </div>

      <div className={styles.taskBottom}>
        <div className={styles.left}>
          <img src={favorIcon} className={styles.image} />
          <img src={twitterIcon} className={styles.image} />
          <img src={youTubeIcon} className={styles.image} />
          <img src={metaIcon} className={styles.image} />
        </div>
        <div className={styles.rightButton} onClick={clickButton}>
          {status === 'Pending'
            ? 'Accept'
            : status === 'OnGoing'
            ? 'Submit'
            : 'Pending'}
        </div>
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
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          <p className={styles.title}>Confirm Your Promotion</p>

          <div className={styles.inputRow}>
            <p className={styles.left}>FavorDAO</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>Twitter</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>YouTube</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>Meta</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.button} onClick={() => setVisible(false)}>
            OK
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default PromotionTask;
