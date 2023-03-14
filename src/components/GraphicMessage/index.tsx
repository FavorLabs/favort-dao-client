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

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const {
    dao,
    contents,
    view_count,
    upvote_count,
    comment_count,
    created_on,
    id,
  } = props.post;
  if (!dao) return <></>;
  const imagesResUrl = useResourceUrl('images');
  const info = getContent(contents);

  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <div className={styles.top}>
          <CommunityInfo daoInfo={dao} createTime={created_on} />
          <PopupContent post={props.post} refreshPage={props.refreshPage} />
        </div>

        <div title="unfold and fold" className={styles.textInfo}>
          <Ellipsis
            rows={4}
            direction="end"
            content={info[2]?.[0]?.content}
            expandText="unfold"
            collapseText="fold"
          />
        </div>

        <div className={styles.mediumInfo}>
          {info[3]?.map((item: any, index: number) => (
            <Image
              src={`${imagesResUrl}/${item.content}`}
              className={styles.imgUrl}
              key={index}
            />
          ))}
        </div>

        <CommentArea
          watchNum={view_count}
          commentOnNum={comment_count}
          likeNum={upvote_count}
          postId={id}
        />
      </div>
    </div>
  );
};

export default GraphicMessage;
