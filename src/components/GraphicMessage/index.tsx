import * as React from 'react';
import styles from './index.less';
import { Image } from 'antd';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { getContent } from '@/utils/util';
import { useResourceUrl } from '@/utils/hooks';

export type Props = {
  post: PostInfo;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const { dao, contents, view_count, upvote_count } = props.post;
  const imagesResUrl = useResourceUrl('images');
  const info = getContent(contents);
  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <CommunityInfo daoInfo={dao} />

        <div className={styles.textInfo}>{info[2]?.[0]?.content}</div>

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
          commentOnNum={456}
          likeNum={upvote_count}
        />
      </div>
    </div>
  );
};

export default GraphicMessage;
