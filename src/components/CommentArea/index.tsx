import * as React from 'react';
import styles from './index.less';
import lookOverImg from '@/assets/icon/look-over.svg';
import commentOnImg from '@/assets/icon/comment-on.svg';
import likeIcon from '@/assets/icon/like-icon.svg';
import likeOnIcon from '@/assets/icon/like-on-icon.svg';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { checkLogin, eventEmitter } from '@/utils/util';
import { history } from 'umi';
import { message } from 'antd';
import { useActivate, useUnactivate } from 'react-activation';

export type Props = {
  watchNum: number;
  commentOnNum: number;
  likeNum: number;
  postId: string;
  postType: number;
};

export type Option = {
  id: string;
  status: boolean;
};

const CommentArea: React.FC<Props> = (props) => {
  const { watchNum, commentOnNum, likeNum, postId, postType } = props;
  const url = useUrl();
  const pathname = history.location.pathname.split('/')[1];

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
      // if (pathname === 'newsletterDetail' || pathname === 'video') {
      //   const option: Option = {
      //     id: postId,
      //     status: data.data.status,
      //   };
      //   eventEmitter.emit('refreshLikeStatus', option);
      // }
      if (data.data.status) setLikeCount(likeCount + 1);
      else setLikeCount(likeCount - 1);
    }
  };

  const postView = async () => {
    const { data } = await PostApi.addPostView(url, postId);
    if (data.data.status) setWatchCount(watchCount + 1);
  };

  const toDetail = () => {
    switch (postType) {
      case 0:
        history.push(`/newsletterDetail/${postId}`);
        break;
      case 1:
        history.push(`/video/${postId}`);
        break;
      default:
        message.warning('Post type error!');
    }
  };

  useEffect(() => {
    if (postId && checkLogin()) {
      getPostLikeStatus();
      postView();
    }
  }, [postId]);

  return (
    <>
      <div className={styles.operate}>
        <div className={styles.operateDiv}>
          <div className={styles.operateIcon}>
            <img src={lookOverImg} className={styles.img} />
          </div>
          <span className={styles.operateText}>{watchCount}</span>
        </div>
        <div className={styles.operateDiv} onClick={toDetail}>
          <div className={styles.operateIcon}>
            <img src={commentOnImg} alt="" className={styles.img} />
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
            <img src={like ? likeOnIcon : likeIcon} className={styles.img} />
          </div>
          <span className={styles.operateText}>{likeCount}</span>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
