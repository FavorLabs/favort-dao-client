import * as React from 'react';
import styles from './index.less';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { getContent } from '@/utils/util';
import PopupContent from '@/components/PopupContent';
import ImageCut from '@/components/ImageCut';
import { history, useHistory, useSelector } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';
import { Models } from '@/declare/modelType';
import JoinButton from '@/components/JoinButton';
import DaoApi from '@/services/tube/Dao';
import { message } from 'antd';
import { useUrl } from '@/utils/hooks';

export type Props = {
  // post: PostInfoAndLike;
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
  isNewsDetail?: boolean;
  isReTransfer?: boolean;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  const intl = useIntl();
  const { isReTransfer } = props;
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
  } = props.post;
  if (!dao) return <></>;
  const info = getContent(contents);
  const { userInfo } = useSelector((state: Models) => state.dao);

  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <div className={styles.top}>
          <div className={styles.left}>
            <CommunityInfo
              daoInfo={isReTransfer ? author_dao : dao}
              createTime={created_on}
            />
            {(type === 2 || type === 3) && (
              <div className={styles.ref}>
                <span className={styles.text}>
                  {intl.formatMessage({
                    id: 'reTransfer.text',
                  })}
                </span>
                <div className={styles.nickName}>
                  {userInfo?.id === dao.id
                    ? `${intl.formatMessage({ id: 'reTransfer.daoName' })}`
                    : `${dao.name}`}
                </div>
              </div>
            )}
          </div>

          {props.isNewsDetail ? (
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

        <div
          className={`${
            route !== 'newsletterDetail' && info[2]?.[0]?.content?.length > 116
              ? styles.textInfo
              : styles.detail
          }`}
          onClick={() => history.push(`/newsletterDetail/${id}`)}
        >
          {info[2]?.[0]?.content}
          {info[2]?.[0]?.content?.length > 116 &&
          route !== 'newsletterDetail' ? (
            <div className={styles.toMore}>
              {intl.formatMessage({
                id: 'graphicMessage.more',
              })}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          className={`${
            info[3]?.length !== 2 ? styles.mediumInfo : styles.twoImage
          } mediumInfo`}
          onClick={(e) => {
            const element = e.target;
            if (element instanceof HTMLElement) {
              if (element.className.includes('mediumInfo')) {
                history.push(`/newsletterDetail/${id}`);
              }
            }
          }}
        >
          {info[3]?.map((item: any, index: number) => (
            <div key={index} className={styles.block}>
              {info[3]?.length === 1 ? (
                <ImageCut imgUrl={item.content} isOneImg={true} />
              ) : (
                <ImageCut imgUrl={item.content} isOneImg={false} />
              )}
            </div>
          ))}
        </div>

        <CommentArea
          watchNum={view_count}
          commentOnNum={comment_count}
          likeNum={upvote_count}
          postId={id}
          postType={type}
          post={props.post}
        />
      </div>
    </div>
  );
};

export default GraphicMessage;
