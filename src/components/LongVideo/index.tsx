import * as React from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import CommentArea from '@/components/CommentArea';
import PopupContent from '@/components/PopupContent';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { getContent, getTime } from '@/utils/util';
import CommunityInfo from '@/components/CommunityInfo';
import playImg from '@/assets/icon/play-icon.svg';
import { ImageMaxSize } from '@/config/constants';
import { Models } from '@/declare/modelType';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
  isReTransfer?: boolean;
};
const LongVideo: React.FC<Props> = (props) => {
  const { isReTransfer } = props;
  const {
    author_dao,
    contents,
    view_count,
    upvote_count,
    dao,
    comment_count,
    created_on,
    id,
    type,
  } = props.post;
  if (!dao) return <></>;
  const history = useHistory();
  const videosResUrl = useResourceUrl('images');
  const info = getContent(contents);
  const time = getTime(created_on);
  const imagesResUrl = useResourceUrl('images');
  const { userInfo } = useSelector((state: Models) => state.dao);
  const toVideo = () => {
    history.push(`/video/${props.post.id}`);
  };

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.left}>
            <CommunityInfo
              daoInfo={isReTransfer ? author_dao : dao}
              createTime={created_on}
            />
            {(type === 2 || type === 3) && (
              <div className={styles.ref}>
                <span className={styles.text}>was retransferde by</span>
                <div className={styles.nickName}>
                  {userInfo?.id === dao.id ? 'Me' : `${dao.name}`}
                </div>
              </div>
            )}
          </div>
          {userInfo?.id === props.post.dao.id && (
            <PopupContent
              post={props.post}
              refreshPage={props.refreshPage}
              delPost={props?.delPost}
            />
          )}
        </div>

        <div className={styles.bottom} onClick={toVideo}>
          <div className={styles.title}>{info?.[1]?.[0]?.content}</div>

          <div
            className={styles.bg}
            style={{
              backgroundImage: `url(${imagesResUrl}/${
                info?.[3]?.[0]?.content + ImageMaxSize
              })`,
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
        postType={type}
        post={props.post}
      />
    </div>
  );
};

export default LongVideo;
