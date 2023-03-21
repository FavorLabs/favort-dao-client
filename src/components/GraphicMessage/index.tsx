import * as React from 'react';
import styles from './index.less';
import { Image } from 'antd';
import { Ellipsis } from 'antd-mobile';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { getContent } from '@/utils/util';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import PopupContent from '@/components/PopupContent';
import ImageCut from '@/components/ImageCut';
import { useState } from 'react';
import { history } from '@@/core/history';
import { useHistory } from 'umi';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  const {
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

  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <div className={styles.top}>
          <CommunityInfo daoInfo={dao} createTime={created_on} />
          <div className={styles.more}>
            <PopupContent
              post={props.post}
              refreshPage={props.refreshPage}
              delPost={props?.delPost}
            />
          </div>
        </div>

        <div
          title="unfold and fold"
          className={`${
            route !== 'newsletterDetail' ? styles.textInfo : styles.detail
          }`}
        >
          {info[2]?.[0]?.content}
          {info[2]?.[0]?.content.length > 113 &&
          route !== 'newsletterDetail' ? (
            <div
              className={styles.toMore}
              onClick={() => history.push(`/newsletterDetail/${id}`)}
            >
              More
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className={styles.mediumInfo}>
          {info[3]?.map((item: any, index: number) => (
            <div key={index}>
              {info[3].length === 1 ? (
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
        />
      </div>
    </div>
  );
};

export default GraphicMessage;
