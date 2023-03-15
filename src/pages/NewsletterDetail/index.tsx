import * as React from 'react';
import styles from './index.less';
import { useParams, history } from 'umi';
import { NavBar, Input, Popup, TextArea } from 'antd-mobile';
import { useEffect, useState, useRef, ReactNode, useMemo } from 'react';
import { PostInfo } from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { message } from 'antd';
import GraphicMessage from '@/components/GraphicMessage';

export type Props = {};
const NewsletterDetail: React.FC<Props> = (props) => {
  const { postId } = useParams<{ postId: string }>();
  const textInput = useRef(null);
  const url = useUrl();

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [comment, setComment] = useState<string>('');
  const [commentPopup, setCommentPopup] = useState<boolean>(false);

  const getPostInfo = async () => {
    try {
      const { data } = await PostApi.getPostById(url, postId);
      if (data.data) setPostInfo(data.data);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const sendDisable = useMemo(() => {
    return !comment;
  }, [comment]);

  const sendComment = async () => {
    if (sendDisable) return message.info('Please enter your comment!');
    try {
      const { data } = await PostApi.addPostComment(url, {
        post_id: postId,
        contents: [
          {
            content: comment,
            type: postInfo?.type,
            sort: 0,
          },
        ],
      });
      if (data.data) {
        setCommentPopup(false);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  useEffect(() => {
    if (postId) getPostInfo();
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
              <>555</>
            )}
          </div>
          <div className={styles.commentList}>5555</div>
        </div>
        <div className={styles.createComment}>
          <Input
            className={'newsCommentInput'}
            placeholder="Say something..."
            value={''}
            onClick={() => {
              setCommentPopup(true);
              setTimeout(() => {
                // @ts-ignore
                textInput.current.focus();
              }, 200);
            }}
          />
        </div>
      </div>
      {commentPopup && (
        <Popup
          className={styles.commentPopup}
          visible={commentPopup}
          onMaskClick={() => {
            setCommentPopup(false);
          }}
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
            onClick={sendComment}
          >
            Send
          </div>
        </Popup>
      )}
    </div>
  );
};

export default NewsletterDetail;
