import * as React from 'react';
import styles from './index.less';
import { useParams, history } from 'umi';
import { NavBar, Skeleton } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { PostInfo } from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { message } from 'antd';
import GraphicMessage from '@/components/GraphicMessage';
import Comment from '@/components/Comment';
import CommentSkeleton from '@/components/CustomSkeleton/CommentSkeleton';
import DetailSkeleton from '@/components/CustomSkeleton/PostSkeleton/DetailSkeleton';
import TopNavBar from '@/components/TopNavBar';

export type Props = {};

const NewsletterDetail: React.FC<Props> = (props) => {
  const { postId } = useParams<{ postId: string }>();
  const url = useUrl();

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);

  const getPostInfo = async () => {
    try {
      const { data } = await PostApi.getPostById(url, postId);
      if (data.data) setPostInfo(data.data);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  useEffect(() => {
    if (postId) {
      getPostInfo();
    }
  }, [postId]);

  return (
    <div className={styles.content}>
      <TopNavBar title={'Main text'} right={null} />
      <div className={styles.detailsWrap}>
        <div className={styles.details}>
          {postInfo ? (
            <>
              <div className={styles.postCard}>
                <GraphicMessage post={postInfo} refreshPage={() => {}} />
              </div>
              <Comment
                postId={postId}
                postType={postInfo.type}
                postCommentCount={postInfo.comment_count}
              />
            </>
          ) : (
            <div className={styles.skeleton}>
              <DetailSkeleton />
              <CommentSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetail;
