import * as React from 'react';
import styles from './index.less';
import lookOver from '@/assets/img/look_over.png';
import commentOn from '@/assets/img/comment_on.png';
import support from '@/assets/img/support.png';
import supportOn from '@/assets/img/support_on.png';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { debounce } from 'lodash';
import { checkLogin } from '@/utils/util';

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

  useEffect(() => {
    if (postId && checkLogin()) getPostLikeStatus();
  }, [postId]);

  return (
    <>
      <div className={styles.operate}>
        <div className={styles.operateDiv}>
          <img src={lookOver} className={styles.operateIcon} />
          <span className={styles.operateText}>{watchNum}</span>
        </div>
        <div className={styles.operateDiv}>
          <img src={commentOn} className={styles.operateIcon} />
          <span className={styles.operateText}>{commentOnNum}</span>
        </div>
        <div
          className={styles.operateDiv}
          onClick={() => {
            postLike();
          }}
        >
          {like ? (
            <img src={supportOn} className={styles.operateIcon} alt={'liked'} />
          ) : (
            <img src={support} className={styles.operateIcon} alt={'like'} />
          )}
          <span className={styles.operateText}>{likeCount}</span>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
