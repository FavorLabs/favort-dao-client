import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import { useUrl } from '@/utils/hooks';
import { useHistory, useSelector } from 'umi';
import CommunityInfo from '@/components/CommunityInfo';
import JoinButton from '@/components/JoinButton';
import PopupContent from '@/components/PopupContent';
import { Models } from '@/declare/modelType';
import { getContent } from '@/utils/util';
import CommentArea from '@/components/CommentArea';
import NewsDetailBlock from '@/components/NewsDetailBlock';
import VideoDetailBlock from '@/components/VideoDetailBlock';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
  isNewsDetail?: boolean;
};

const QuoteNews: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();
  const { isNewsDetail, post, refreshPage, delPost } = props;
  const { dao, view_count, upvote_count, comment_count, created_on, id, type } =
    post;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const newsText = getContent(post.contents);

  return (
    <div className={styles.quoteNews}>
      <div className={styles.inContent}>
        <div className={styles.top}>
          <div className={styles.left}>
            <CommunityInfo daoInfo={dao} createTime={created_on} />
          </div>

          {isNewsDetail ? (
            dao.id !== userInfo?.id ? (
              <JoinButton isRefresh={true} daoId={dao.id} />
            ) : (
              <></>
            )
          ) : (
            <div className={styles.more}>
              {userInfo?.id === post.dao.id && (
                <PopupContent
                  post={post}
                  refreshPage={refreshPage}
                  delPost={delPost}
                />
              )}
            </div>
          )}
        </div>

        <div
          className={styles.newsText}
          onClick={() => history.push(`/newsletterDetail/${id}`)}
        >
          {newsText && `${newsText[2][0].content}`}
        </div>

        <div className={styles.quoteContent}>
          {post.orig_type === 0 ? (
            <NewsDetailBlock post={post} isReTransfer={true} isQuote={true} />
          ) : (
            <VideoDetailBlock post={post} isReTransfer={true} isQuote={true} />
          )}
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
    </div>
  );
};

export default QuoteNews;
