import * as React from 'react';
import styles from './index.less';
import lookOver from '@/assets/img/look_over.png';
import commentOn from '@/assets/img/comment_on.png';
import support from '@/assets/img/support.png';

export type Props = {
  title?: String;
  community?: String;
  time?: String;
  content?: String;
  watchNum?: Number;
  commentNum?: Number;
  starNum?: Number;
};
const LongVideo: React.FC<Props> = (props) => {
  const videoImg =
    'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca';
  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.left}>
          <img src={videoImg} alt="" />
          <div className={styles.duration}>16:05</div>
        </div>
        <div className={styles.right}>
          <h4>{props.title}</h4>
          <span>{props.community}</span>
          <span className={styles.time}>{props.time}</span>
          <p>{props.content}</p>
        </div>
      </div>

      <div className={styles.foot}>
        <div className={styles.div}>
          <img src={lookOver} className={styles.icon} />
          <span className={styles.text}>{props.watchNum}</span>
        </div>
        <div className={styles.div}>
          <img src={commentOn} className={styles.icon} />
          <span className={styles.text}>{props.commentNum}</span>
        </div>
        <div className={styles.div}>
          <img src={support} className={styles.icon} />
          <span className={styles.text}>{props.starNum}</span>
        </div>
      </div>
    </div>
  );
};

export default LongVideo;
