import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import CommentArea from '@/components/CommentArea';
import PopupContent from '@/components/PopupContent';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { getContent, getTime } from '@/utils/util';
import CommunityInfo from '@/components/CommunityInfo';
import playImg from '@/assets/icon/play-icon.svg';
import SvgIcon from '@/components/SvgIcon';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
};
const LongVideo: React.FC<Props> = (props) => {
  const {
    contents,
    view_count,
    upvote_count,
    dao,
    comment_count,
    created_on,
    id,
  } = props.post;
  if (!dao) return <></>;
  const history = useHistory();
  const videosResUrl = useResourceUrl('images');
  const info = getContent(contents);
  const time = getTime(created_on);
  const imagesResUrl = useResourceUrl('images');
  const toVideo = () => {
    history.push(`/video/${props.post.id}`);
  };

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.top}>
          <CommunityInfo daoInfo={dao} createTime={created_on} />
          <PopupContent post={props.post} refreshPage={props.refreshPage} />
        </div>

        <div className={styles.bottom} onClick={toVideo}>
          <div className={styles.title}>{info?.[1]?.[0]?.content}</div>

          <div
            className={styles.bg}
            style={{
              backgroundImage: `url(${imagesResUrl}/${info?.[3]?.[0]?.content})`,
              backgroundSize: `100%`,
              backgroundPosition: `center center`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img src={playImg} className={styles.play} />
          </div>
        </div>
      </div>

      <CommentArea
        watchNum={view_count}
        commentOnNum={comment_count}
        likeNum={upvote_count}
        postId={id}
      />
    </div>
  );
};

export default LongVideo;
