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
import { checkLogin, getDebounce, getTime } from '@/utils/util';
import PostApi from '@/services/tube/PostApi';
import {
  CommentInfo,
  CommentReplyRes,
  GetCommentsParams,
} from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import commentOnImg from '@/assets/icon/comment-on.svg';
import ItemSkeleton from '@/components/CustomSkeleton/CommentSkeleton/ItemSkeleton';
import { useIntl } from '@@/plugin-locale/localeExports';
import LogoutDialog from '@/components/LogoutDialog';

export type Props = {
  postId: string;
  postType: number;
  postCommentCount: number;
};
type CommentInfoRender = CommentInfo & { folded: boolean };
type CommentListMap = {
  [key: number]: CommentInfoRender;
};
type CurrentReply = {
  id: string;
  idx: number;
};
const Comment: React.FC<Props> = (props) => {
  const { postId, postType, postCommentCount } = props;
  const url = useUrl();
  const intl = useIntl();
  const avatarsResUrl = useResourceUrl('avatars');
  const textInput = useRef(null);

  const loginStatus = checkLogin();

  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [commentPopup, setCommentPopup] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(postCommentCount);
  const [commentListMap, setCommentListMap] = useState<CommentListMap>({});
  const [comListLoading, setComListLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageData, setPageData] = useState<GetCommentsParams>({
    page: 1,
    page_size: 10,
    id: postId,
  });
  const [currentReply, setCurrentReply] = useState<CurrentReply>({
    id: '',
    idx: 0,
  });

  const { user } = useSelector((state: Models) => state.global);

  const loadMore = async () => {
    // setComListLoading(true);
    try {
      const { data } = await PostApi.getPostComments(url, pageData);
      if (data.data.list) {
        // setCommentList(data.data.list);
        const map: CommentListMap = {};
        data.data.list.forEach((item, index) => {
          map[(pageData.page - 1) * 10 + index] = { ...item, folded: true };
        });
        setCommentListMap({ ...commentListMap, ...map });
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
    setCurrentReply({ id: '', idx: 0 });
  };

  const sendComment = async () => {
    if (sendDisable)
      return message.info(
        `${intl.formatMessage({
          id: 'comment.comment.message',
        })}`,
      );
    setCommentPopup(false);
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
        const commentFill: CommentInfoRender = {
          id: res.id,
          post_id: res.post_id,
          address: res.address,
          user: {
            id: user?.address as string,
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
          folded: true,
          created_on: res.created_on,
          modified_on: res.modified_on,
        };
        setCommentListMap({
          ...commentListMap,
          [Object.keys(commentListMap).length]: commentFill,
        });
        setCommentCount(commentCount + 1);
        resetPopup();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const sendReply = async () => {
    if (sendDisable)
      return message.info(
        `${intl.formatMessage({
          id: 'comment.reply.message',
        })}`,
      );
    setCommentPopup(false);
    try {
      const { data } = await PostApi.addCommentReply(url, {
        comment_id: currentReply.id,
        content: comment,
      });
      if (data.data) {
        const res = data.data;
        const commentReplyFill: CommentReplyRes = {
          id: res.id,
          content: res.content,
          user: {
            id: user?.address as string,
            address: user?.address as string,
            avatar: user?.avatar as string,
            nickname: user?.nickname as string,
          },
        };
        setCommentListMap({
          ...commentListMap,
          [currentReply.idx]: {
            ...commentListMap[currentReply.idx],
            replies: [
              ...commentListMap[currentReply.idx].replies,
              commentReplyFill,
            ],
          },
        });
        setCommentCount(commentCount + 1);
        resetPopup();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const sendJudgment = () => {
    if (currentReply.id) sendReply();
    else sendComment();
  };

  return (
    <div className={styles.comment}>
      {!loginStatus && (
        <div
          className={styles.mask}
          onClick={() => {
            setLogoutDialog(true);
          }}
        />
      )}

      <div className={styles.commentList}>
        <div className={styles.countWrap}>
          {postCommentCount != undefined ? (
            <p className={styles.count}>
              {commentCount}{' '}
              {intl.formatMessage({
                id: 'comment.commentCount.text',
              })}
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
              {Object.values(commentListMap).map((item, index) => (
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
                    {!!item.replies?.length && (
                      <div className={styles.replyList}>
                        {item.folded
                          ? item.replies.slice(0, 2).map((item) => (
                              <p key={item.id} className={styles.replyItem}>
                                <span className={styles.name}>
                                  {item.user.nickname}:
                                </span>
                                {item.content}
                              </p>
                            ))
                          : item.replies.map((item) => (
                              <p key={item.id} className={styles.replyItem}>
                                <span className={styles.name}>
                                  {item.user.nickname}:
                                </span>
                                {item.content}
                              </p>
                            ))}
                        {item.replies.length > 2 && item.folded && (
                          <p
                            className={styles.moreReply}
                            onClick={() => {
                              setCommentListMap({
                                ...commentListMap,
                                [index]: {
                                  ...commentListMap[index],
                                  folded: false,
                                },
                              });
                            }}
                          >
                            {item.replies.length - 2}
                            {intl.formatMessage({
                              id: 'comment.moreReplies',
                            })}{' '}
                            {'>'}
                          </p>
                        )}
                      </div>
                    )}
                    <div className={styles.action}>
                      <div
                        className={styles.replyBtn}
                        onClick={() => {
                          setCurrentReply({ id: item.id, idx: index });
                          setComment('');
                          if (loginStatus) {
                            setCommentPopup(true);
                          } else {
                            setLogoutDialog(true);
                          }
                        }}
                      >
                        <img src={commentOnImg} alt="" />
                        <span>
                          {intl.formatMessage({
                            id: 'comment.action.reply.text',
                          })}
                        </span>
                      </div>
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
            <div className={styles.loading}>
              <ItemSkeleton />
            </div>
          ) : (
            <p style={{ width: '100%', textAlign: 'center' }}>
              {intl.formatMessage({
                id: 'comment.infiniteScroll.bottom',
              })}
            </p>
          )}
        </>
      </InfiniteScroll>
      <div className={styles.createComment}>
        <Input
          className={'newsCommentInput'}
          placeholder={`${intl.formatMessage({
            id: 'comment.createComment.placeholder',
          })}`}
          value={''}
          disabled={postType == undefined}
          onClick={() => {
            setCurrentReply({ id: '', idx: 0 });
            setComment('');
            if (loginStatus) {
              setCommentPopup(true);
              setTimeout(() => {
                // @ts-ignore
                textInput.current.focus();
              }, 200);
            } else {
              setLogoutDialog(true);
            }
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
        bodyStyle={{ padding: '1.25rem', boxSizing: 'border-box' }}
      >
        <TextArea
          ref={textInput}
          className={'newsCommentInput'}
          placeholder={`${intl.formatMessage({
            id: 'comment.popup.textarea.placeholder',
          })}${
            currentReply.id
              ? `${intl.formatMessage({
                  id: 'comment.action.reply.text',
                })}`
              : `${intl.formatMessage({
                  id: 'comment.comment',
                })}`
          }`}
          autoSize={{ minRows: 5, maxRows: 7 }}
          maxLength={100}
          onChange={(val) => {
            setComment(val.trim());
          }}
        />
        <div
          className={`${styles.sendBtn} ${!sendDisable && styles.active}`}
          onClick={getDebounce(sendJudgment)}
        >
          {intl.formatMessage({
            id: 'comment.popup.sendBtn',
          })}
        </div>
      </Popup>

      <div className="logoutDialog">
        <LogoutDialog
          visible={logoutDialog}
          closeDialog={() => {
            setLogoutDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default Comment;
