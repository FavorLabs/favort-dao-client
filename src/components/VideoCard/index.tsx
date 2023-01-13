import * as React from 'react';
import styles from './index.less';
import Video, { video } from '@/config/temp';

export type Props = {
  videoInfo: video;
};
const VideoCard: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.content}>
        <figure className={styles.videoCard}>
          <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url(${props.videoInfo.thumbnailUrl})` }}
          ></div>
          <figcaption className={styles.details}>
            <p className={styles.title}>{props.videoInfo.title}</p>
            <p className={styles.viewsDate}>
              <span className={styles.views}>
                {props.videoInfo.views} views
              </span>
              <span className={styles.separator}>&bull;</span>
              <span className={styles.date}>
                {props.videoInfo.date.toString()}
              </span>
            </p>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default VideoCard;
