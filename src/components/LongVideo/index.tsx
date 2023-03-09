import * as React from 'react';
import styles from './index.less';
import moreImg from '@/assets/img/more-img.png';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { getContent } from '@/utils/util';

export type Props = {
  post: PostInfo;
};
const LongVideo: React.FC<Props> = (props) => {
  const { user, contents, view_count, upvote_count } = props.post;
  const videosResUrl = useResourceUrl('images');
  const info = getContent(contents);
  const community = 'FavorDao';
  const time = '08:00';
  const videoTime = '16:05';
  const moreClick = () => {
    console.log('Click more buttons');
  };

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.left}>
          <img
            className={styles.img}
            src={`${videosResUrl}/${info?.[3]?.[0]?.content}`}
            alt=""
          />
          <div className={styles.duration}>{videoTime}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.nav}>
              <p className={styles.title}>{info?.[1]?.[0]?.content}</p>
              <img
                className={styles.moreImg}
                src={moreImg}
                alt=""
                onClick={moreClick}
              />
            </div>
            <p className={styles.content}>{info?.[2]?.[0]?.content}</p>
          </div>
          <div className={styles.bottom}>
            <p className={styles.name}>{community}</p>
            <p className={styles.time}>{time}</p>
          </div>
        </div>
      </div>

      <CommentArea
        watchNum={view_count}
        commentOnNum={456}
        likeNum={upvote_count}
      />
    </div>
  );
};

export default LongVideo;
