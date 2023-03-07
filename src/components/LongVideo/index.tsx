import * as React from 'react';
import styles from './index.less';
import moreImg from '@/assets/img/more-img.png';
import CommentArea from '@/components/CommentArea';

export type Props = {
  title?: string;
  community?: string;
  time?: string;
  content?: string;
  videoUrl?: string;
  videoTime?: string;
};
const LongVideo: React.FC<Props> = (props) => {
  const { title, community, time, content, videoTime, videoUrl } = props;
  const moreClick = () => {
    console.log('点击了更多按钮');
  };

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.left}>
          <img className={styles.img} src={videoUrl} alt="" />
          <div className={styles.duration}>{videoTime}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.nav}>
              <p className={styles.title}>{title}</p>
              <img
                className={styles.moreImg}
                src={moreImg}
                alt=""
                onClick={moreClick}
              />
            </div>
            <p className={styles.content}>{content}</p>
          </div>
          <div className={styles.bottom}>
            <p className={styles.name}>{community}</p>
            <p className={styles.time}>{time}</p>
          </div>
        </div>
      </div>

      <CommentArea watchNum={980} commentOnNum={456} likeNum={201} />
    </div>
  );
};

export default LongVideo;
