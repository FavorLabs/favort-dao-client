import * as React from 'react';
import { useMemo, useState, useRef } from 'react';
import styles from './index.less';
import { useSelector } from 'umi';
import { message } from 'antd';
import {
  DotLoading,
  InfiniteScroll,
  Input,
  Popup,
  Skeleton,
  TextArea,
} from 'antd-mobile';
import UserAvatar from '@/components/UserAvatar';
import { useUrl, useResourceUrl } from '@/utils/hooks';
import { getTime } from '@/utils/util';
import PostApi from '@/services/tube/PostApi';
import { CommentInfo, GetCommentsParams } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';

export type Props = {
  postId: string;
  postType: number;
  postCommentCount: number;
};
type CommentListMap = {
  [key: number]: CommentInfo;
};
const Comment: React.FC<Props> = (props) => {
  const { postId, postType, postCommentCount } = props;
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const textInput = useRef(null);

  const [comment, setComment] = useState<string>('');
  const [commentPopup, setCommentPopup] = useState<boolean>(false);
  const [commentListMap, setCommentListMap] = useState<CommentListMap>({});
  const [comListLoading, setComListLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageData, setPageData] = useState<GetCommentsParams>({
    page: 1,
    page_size: 10,
    id: postId,
  });
  const [currentReply, setCurrentReply] = useState<string>('');

  const { user } = useSelector((state: Models) => state.global);

  const loadMore = async () => {
    // setComListLoading(true);
    try {
      const { data } = await PostApi.getPostComments(url, pageData);
      if (data.data.list) {
        // setCommentList(data.data.list);
        const map: CommentListMap = {};
        data.data.list.forEach((item, index) => {
          map[index] = item;
        });
        setCommentListMap(map);
        setHasMore(
          data.data.pager.total_rows > pageData.page * pageData.page_size,
        );
        setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
      }
      // setComListLoading(false);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setHasMore(false);
    }
  };

  const sendDisable = useMemo(() => {
    return !comment;
  }, [comment]);

  const resetPopup = () => {
    setComment('');
    setCurrentReply('');
    setCommentPopup(false);
  };

  const sendComment = async () => {
    if (sendDisable) return message.info('Please enter your comment!');
    try {
      const { data } = await PostApi.addPostComment(url, {
        post_id: postId,
        contents: [
          {
            content: comment,
            type: postType,
            sort: 0,
          },
        ],
      });
      if (data.data) {
        const res = data.data;
        const commentFill: CommentInfo = {
          id: res.id,
          post_id: res.post_id,
          address: res.address,
          user: {
            address: user?.address as string,
            avatar: user?.avatar as string,
            nickname: user?.nickname as string,
          },
          contents: [
            {
              id: res.id,
              created_on: res.created_on,
              modified_on: res.modified_on,
              deleted_on: res.deleted_on,
              is_del: res.is_del,
              comment_id: res.id,
              post_id: res.post_id,
              address: res.address,
              content: comment,
              type: postType,
              sort: 0,
            },
          ],
          replies: [],
          created_on: res.created_on,
          modified_on: res.modified_on,
        };
        setCommentListMap({
          ...commentListMap,
          [Object.keys(commentListMap).length]: commentFill,
        });
        resetPopup();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const sendReply = async () => {
    if (sendDisable) return message.info('Please enter your reply!');
    try {
      const { data } = await PostApi.addCommentReply(url, {
        comment_id: currentReply,
        content: comment,
      });
      if (data.data) {
        console.log('sendReply', data.data);
        resetPopup();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentList}>
        <div className={styles.countWrap}>
          {postCommentCount != undefined ? (
            <p className={styles.count}>{postCommentCount} comments</p>
          ) : (
            <Skeleton animated className={styles.skeleton} />
          )}
        </div>
        <div className={styles.listWrap}>
          {comListLoading ? (
            <Skeleton animated className={styles.skeleton} />
          ) : (
            <div className={styles.itemList}>
              {Object.values(commentListMap).map((item) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.left}>
                    <UserAvatar
                      className={styles.avatar}
                      prefix={avatarsResUrl}
                      name={item.user.nickname}
                      identifier={item.user.avatar}
                      size={38}
                    />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.name}>{item.user.nickname}</div>
                    <div className={styles.time}>
                      {getTime(item.created_on)}
                    </div>
                    <p className={styles.text}>{item.contents[0].content}</p>
                    <div className={styles.action}>
                      {/*<div className={styles.replyBtn} onClick={() => {*/}
                      {/*  setCurrentReply(item.id);*/}
                      {/*  setComment('');*/}
                      {/*  setCommentPopup(true);*/}
                      {/*}}>*/}
                      {/*  <img src={commentOnImg} alt=""/>*/}
                      {/*  <span>reply</span>*/}
                      {/*</div>*/}
                      {/*<div className={styles.likeBtn}>*/}
                      {/*  <img src={supportImg} alt=""/>*/}
                      {/*  <span>123</span>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        className={styles.InfiniteScroll}
      >
        <>
          {hasMore ? (
            <>
              <span>Loading</span>
              <DotLoading />
            </>
          ) : (
            <p style={{ width: '100%', textAlign: 'center' }}>
              Already at the bottom
            </p>
          )}
        </>
      </InfiniteScroll>
      <div className={styles.createComment}>
        <Input
          className={'newsCommentInput'}
          placeholder="Say something..."
          value={''}
          disabled={postType == undefined}
          onClick={() => {
            setCurrentReply('');
            setComment('');
            setCommentPopup(true);
            setTimeout(() => {
              // @ts-ignore
              textInput.current.focus();
            }, 200);
          }}
        />
      </div>
      <Popup
        className={styles.commentPopup}
        visible={commentPopup}
        onMaskClick={() => {
          setCommentPopup(false);
        }}
        destroyOnClose={true}
        bodyStyle={{ padding: '20px', boxSizing: 'border-box' }}
      >
        <TextArea
          ref={textInput}
          className={'newsCommentInput'}
          placeholder="Please enter a comment"
          autoSize={{ minRows: 5, maxRows: 7 }}
          maxLength={100}
          onChange={(val) => {
            setComment(val.trim());
          }}
        />
        <div
          className={`${styles.sendBtn} ${!sendDisable && styles.active}`}
          onClick={() => {
            if (currentReply) sendReply();
            else sendComment();
          }}
        >
          Send
        </div>
      </Popup>
    </div>
  );
};

export default Comment;
