import * as React from 'react';
import styles from './index.less';
import { useParams, history, useSelector } from 'umi';
import {
  NavBar,
  Input,
  Popup,
  TextArea,
  Skeleton,
  DotLoading,
  InfiniteScroll,
} from 'antd-mobile';
import { useEffect, useState, useRef, ReactNode, useMemo } from 'react';
import {
  CommentInfo,
  GetCommentsParams,
  Page,
  PostInfo,
} from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { message } from 'antd';
import GraphicMessage from '@/components/GraphicMessage';
import UserAvatar from '@/components/UserAvatar';
import commentOnImg from '@/assets/img/comment_on.png';
import supportOnImg from '@/assets/img/support_on.png';
import supportImg from '@/assets/img/support.png';
import { getTime } from '@/utils/util';
import { Models } from '@/declare/modelType';

export type Props = {};
type CommentListMap = {
  [key: number]: CommentInfo;
};

const NewsletterDetail: React.FC<Props> = (props) => {
  const { postId } = useParams<{ postId: string }>();
  const textInput = useRef(null);
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [comment, setComment] = useState<string>('');
  const [commentPopup, setCommentPopup] = useState<boolean>(false);
  // const [commentList, setCommentList] = useState<CommentInfo[]>([]);
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

  const getPostInfo = async () => {
    try {
      const { data } = await PostApi.getPostById(url, postId);
      if (data.data) setPostInfo(data.data);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const loadMore = async () => {
    // setComListLoading(true);
    try {
      const { data } = await PostApi.getPostComments(url, {
        page: 1,
        page_size: 1,
        id: postId,
      });
      if (data.data.list) {
        // setCommentList(data.data.list);
        const map: CommentListMap = {};
        data.data.list.forEach((item, index) => {
          map[index] = item;
        });
        console.log('map', map);
        setCommentListMap(map);
        setHasMore(
          data.data.pager.total_rows > pageData.page * pageData.page_size,
        );
        setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
      }
      // setComListLoading(false);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
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
            type: postInfo?.type as number,
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
              type: postInfo?.type as number,
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

  useEffect(() => {
    if (postId) {
      getPostInfo();
      // getPostComment();
    }
  }, [postId]);

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Main text
      </NavBar>
      <div className={styles.detailsWrap}>
        <div className={styles.details}>
          <div className={styles.postCard}>
            {postInfo ? (
              <GraphicMessage post={postInfo} refreshPage={() => {}} />
            ) : (
              <Skeleton animated className={styles.skeleton} />
            )}
          </div>
          <div className={styles.commentList}>
            <div className={styles.countWrap}>
              {postInfo ? (
                <p className={styles.count}>
                  {postInfo.comment_count} comments
                </p>
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
                        <p className={styles.text}>
                          {item.contents[0].content}
                        </p>
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
        </div>
        <div className={styles.createComment}>
          <Input
            className={'newsCommentInput'}
            placeholder="Say something..."
            value={''}
            disabled={!postInfo}
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

export default NewsletterDetail;
