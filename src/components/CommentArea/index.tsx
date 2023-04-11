import * as React from 'react';
import styles from './index.less';
import lookOverImg from '@/assets/icon/look-over.svg';
import commentOnImg from '@/assets/icon/comment-on.svg';
import likeIcon from '@/assets/icon/like-icon.svg';
import likeOnIcon from '@/assets/icon/like-on-icon.svg';
import reTransfer from '@/assets/icon/reTransfer.svg';
import reTransferIcon from '@/assets/icon/reTransfer-icon.svg';
import quoteIcon from '@/assets/icon/quote-icon.svg';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { checkLogin, eventEmitter, getDebounce } from '@/utils/util';
import { history, useSelector } from 'umi';
import { message } from 'antd';
import { useActivate, useUnactivate } from 'react-activation';
import { PostInfo, ReTransferPost } from '@/declare/tubeApiType';
import { Popup } from 'antd-mobile';
import { Models } from '@/declare/modelType';
import { useIntl } from '@@/plugin-locale/localeExports';

export type Props = {
  watchNum: number;
  commentOnNum: number;
  likeNum: number;
  postId: string;
  postType: number;
  post: PostInfo;
};

export type Option = {
  id: string;
  status: boolean;
};

const CommentArea: React.FC<Props> = (props) => {
  const { watchNum, commentOnNum, likeNum, postId, postType, post } = props;
  const url = useUrl();
  const { userInfo } = useSelector((state: Models) => state.dao);
  const intl = useIntl();

  const [like, setLike] = useState<boolean>(false);
  const [isPostLike, setIsPostLike] = useState<boolean>(true);
  const [watchCount, setWatchCount] = useState<number>(watchNum);
  const [likeCount, setLikeCount] = useState<number>(likeNum);
  const [commentOnCount, setCommentOnCount] = useState<number>(commentOnNum);
  const [visible, setVisible] = useState(false);

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, postId);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if (isPostLike) {
      try {
        setIsPostLike(false);
        const { data } = await PostApi.postLike(url, postId);
        if (data.data) {
          setLike(data.data.status);
          if (data.data.status) setLikeCount(likeCount + 1);
          else setLikeCount(likeCount - 1);
        }
      } catch (e) {
        setIsPostLike(true);
      }
    }
  };

  const postView = async () => {
    try {
      const { data } = await PostApi.addPostView(url, postId);
      if (data.data.status) setWatchCount(watchCount + 1);
    } catch (e) {}
  };

  const toDetail = () => {
    switch (postType) {
      case 0:
        history.push(`/newsletterDetail/${postId}`);
        break;
      case 1:
        history.push(`/video/${postId}`);
        break;
      case 2:
        if (post.orig_type === 0) {
          history.push(`/newsletterDetail/${postId}`);
        } else {
          history.push(`/video/${postId}`);
        }
        break;
      default:
        message.warning('Post type error!');
    }
  };

  const reTransferFun = async () => {
    setVisible(false);
    if (userInfo) {
      try {
        const postData: ReTransferPost = {
          dao_id: userInfo?.id as string,
          type: 2,
          ref_id: post.id,
          ref_type: 0,
          visibility: 1,
        };
        const { data } = await PostApi.reTransferPost(url, postData);
        if (data.data) {
          message.success(
            `${intl.formatMessage({
              id: 'commentArea.reTransfer.messageSuccess',
            })}`,
          );
          // eventEmitter.emit('menuRefreshRecommend');
        }
      } catch (e) {
        message.error(
          `${intl.formatMessage({
            id: 'commentArea.reTransfer.messageError',
          })}`,
        );
      }
    } else {
      message.warning('Please create a DAO first!');
    }
  };

  useEffect(() => {
    if (postId && checkLogin()) {
      postView();
    }
  }, [postId]);

  useEffect(() => {
    if (postId && checkLogin()) {
      setLikeCount(likeNum);
      setWatchCount(watchNum);
      setCommentOnCount(commentOnNum);
      getPostLikeStatus();
    }
  }, [likeNum, watchNum, commentOnNum]);

  useEffect(() => {
    setIsPostLike(true);
  }, [like]);

  return (
    <>
      <div className={styles.operate}>
        <div className={styles.operateDiv}>
          <div className={styles.operateIcon}>
            <img src={lookOverImg} className={styles.img} />
          </div>
          <span className={styles.operateText}>{watchCount}</span>
        </div>
        <div className={styles.operateDiv} onClick={() => setVisible(true)}>
          <div className={styles.operateIcon}>
            <img src={reTransfer} className={styles.img} />
          </div>
          <span className={styles.operateText}>0</span>
        </div>
        <div className={styles.operateDiv} onClick={toDetail}>
          <div className={styles.operateIcon}>
            <img src={commentOnImg} alt="" className={styles.img} />
          </div>
          <span className={styles.operateText}>{commentOnCount}</span>
        </div>
        <div className={styles.operateDiv} onClick={getDebounce(postLike)}>
          <div className={styles.operateIcon}>
            <img src={like ? likeOnIcon : likeIcon} className={styles.img} />
          </div>
          <span className={styles.operateText}>{likeCount}</span>
        </div>
      </div>

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
        }}
      >
        <div className={styles.popupPage}>
          <div className={styles.row} onClick={reTransferFun}>
            <img src={reTransferIcon} alt="" className={styles.img} />
            <span className={styles.text}>
              {intl.formatMessage({
                id: 'commentArea.reTransfer',
              })}
            </span>
          </div>
          {/*<div className={styles.row}>*/}
          {/*  <img src={quoteIcon} alt="" className={styles.img} />*/}
          {/*  <span className={styles.text}>*/}
          {/*    {intl.formatMessage({*/}
          {/*      id: 'commentArea.quote',*/}
          {/*    })}*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div className={styles.cancel} onClick={() => setVisible(false)}>
            {intl.formatMessage({
              id: 'popupContent.cancel',
            })}
          </div>
        </div>
      </Popup>
    </>
  );
};

export default CommentArea;
