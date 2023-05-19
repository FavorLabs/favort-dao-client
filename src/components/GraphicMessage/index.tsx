import * as React from 'react';
import styles from './index.less';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { checkLogin, getContent } from '@/utils/util';
import PopupContent from '@/components/PopupContent';
import ImageCut from '@/components/ImageCut';
import { history, useHistory, useSelector } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';
import { Models } from '@/declare/modelType';
import JoinButton from '@/components/JoinButton';
import DaoApi from '@/services/tube/Dao';
import { message } from 'antd';
import { useUrl } from '@/utils/hooks';
import NewsDetailBlock from '@/components/NewsDetailBlock';
import LongVideo from '@/components/LongVideo';
import QuoteBlock from '@/components/QuoteBlock';
import VideoDetailBlock from '@/components/VideoDetailBlock';
import reTransFerIcon from '@/assets/icon/reTransFerIcon.svg';
import VideoQuoteBlock from '@/components/VideoQuoteBlock/VideoQuoteBlock';

export type Props = {
  // post: PostInfoAndLike;
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
  isNewsDetail?: boolean;
  // isReTransfer?: boolean;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  const intl = useIntl();
  // const { isReTransfer } = props;
  const {
    author_dao,
    dao,
    contents,
    view_count,
    upvote_count,
    comment_count,
    created_on,
    id,
    type,
    orig_contents,
    orig_type,
    ref_id,
  } = props.post;
  if (!dao) return <></>;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const loginStatus = checkLogin();

  const handleClick = () => {
    history.push(`/daoCommunity/${props.post?.dao.id}`);
  };

  return (
    <div className={styles.container}>
      {!contents && (
        <div className={styles.trans} onClick={handleClick}>
          <img src={reTransFerIcon} alt="" className={styles.imgSvg} />
          <span className={styles.dao}>{dao.name}</span>
          <span className={styles.text}>retransfer this</span>
        </div>
      )}

      <div className={styles.inContent}>
        {contents?.length && (
          <>
            <div className={styles.top}>
              <div className={styles.left}>
                <CommunityInfo daoInfo={dao} createTime={created_on} />
              </div>

              {props.isNewsDetail && loginStatus ? (
                dao.id !== userInfo?.id ? (
                  <JoinButton isRefresh={true} daoId={dao.id} />
                ) : (
                  <></>
                )
              ) : (
                <div className={styles.more}>
                  {userInfo?.id === props.post.dao.id && (
                    <PopupContent
                      post={props.post}
                      refreshPage={props.refreshPage}
                      delPost={props?.delPost}
                    />
                  )}
                </div>
              )}
            </div>

            <NewsDetailBlock post={props.post} isReTransfer={!contents} />
          </>
        )}

        {orig_contents?.length ? (
          orig_type === 0 ? (
            <QuoteBlock post={props.post} />
          ) : orig_type === 1 ? (
            <VideoQuoteBlock post={props.post} />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        <CommentArea
          watchNum={view_count}
          commentOnNum={comment_count}
          likeNum={upvote_count}
          postId={contents?.length ? id : ref_id}
          postType={type}
          post={props.post}
        />
      </div>
    </div>
  );
};

export default GraphicMessage;
