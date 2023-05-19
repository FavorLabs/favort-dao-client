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
import { useIntl } from '@@/plugin-locale/localeExports';
import VideoDetailBlock from '@/components/VideoDetailBlock';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
  // isReTransfer?: boolean;
};
const LongVideo: React.FC<Props> = (props) => {
  // const { isReTransfer } = props;
  const {
    author_dao,
    view_count,
    upvote_count,
    dao,
    comment_count,
    created_on,
    id,
    type,
  } = props.post;
  if (!dao) return <></>;
  const { userInfo } = useSelector((state: Models) => state.dao);

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.left}>
            <CommunityInfo daoInfo={dao} createTime={created_on} />
          </div>
          {userInfo?.id === props.post.dao.id && (
            <PopupContent
              post={props.post}
              refreshPage={props.refreshPage}
              delPost={props?.delPost}
            />
          )}
        </div>

        <VideoDetailBlock post={props.post} />
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
