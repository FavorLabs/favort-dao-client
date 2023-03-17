import * as React from 'react';
import styles from './index.less';
import lookOverImg from '@/assets/icon/look-over.svg';
import commentOnImg from '@/assets/icon/comment-on.svg';
import likeIcon from '@/assets/icon/like-icon.svg';
import likeOnIcon from '@/assets/icon/like-on-icon.svg';
import likeImg from '@/assets/img/support.png';
import likeOnImg from '@/assets/img/support_on.png';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { checkLogin } from '@/utils/util';
import SvgIcon from '@/components/SvgIcon';
import { history } from 'umi';

export type Props = {
  watchNum: number;
  commentOnNum: number;
  likeNum: number;
  postId: string;
};

const CommentArea: React.FC<Props> = (props) => {
  const { watchNum, commentOnNum, likeNum, postId } = props;
  const url = useUrl();

  const [like, setLike] = useState<boolean>(false);
  const [watchCount, setWatchCount] = useState<number>(watchNum);
  const [likeCount, setLikeCount] = useState<number>(likeNum);

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, postId);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    const { data } = await PostApi.postLike(url, postId);
    if (data.data) {
      setLike(data.data.status);
      if (data.data.status) setLikeCount(likeCount + 1);
      else setLikeCount(likeCount - 1);
    }
  };

  const postView = async () => {
    const { data } = await PostApi.addPostView(url, postId);
    if (data.data) {
      setWatchCount(watchCount + 1);
    }
  };

  useEffect(() => {
    if (postId && checkLogin()) getPostLikeStatus();
    // if (postId) postView();
  }, [postId]);

  return (
    <>
      <div className={styles.operate}>
        <div className={styles.operateDiv}>
          <div className={styles.operateIcon}>
            <SvgIcon svg={lookOverImg} />
          </div>
          <span className={styles.operateText}>{watchCount}</span>
        </div>
        <div
          className={styles.operateDiv}
          onClick={() => {
            history.push(`/newsletterDetail/${postId}`);
          }}
        >
          <div className={styles.operateIcon}>
            <SvgIcon svg={commentOnImg} />
          </div>
          <span className={styles.operateText}>{commentOnNum}</span>
        </div>
        <div
          className={styles.operateDiv}
          onClick={() => {
            postLike();
          }}
        >
          <div className={styles.operateIcon}>
            {like ? (
              <img src={likeOnIcon} className={styles.img} />
            ) : (
              <img src={likeIcon} className={styles.img} />
            )}
          </div>
          <span className={styles.operateText}>{likeCount}</span>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
