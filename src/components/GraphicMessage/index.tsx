import * as React from 'react';
import styles from './index.less';
import { Image } from 'antd';
import { Popup, Space } from 'antd-mobile';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { getContent } from '@/utils/util';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import moreImg from '@/assets/img/more-img.png';
import { useEffect, useState } from 'react';
import PopupContent from '@/components/PopupContent';
import PostApi from '@/services/tube/PostApi';

export type Props = {
  post: PostInfo;
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
  const url = useUrl();
  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(upvote_count);
  const moreClick = () => {
    setVisible(!visible);
  };
  const imagesResUrl = useResourceUrl('images');
  const info = getContent(contents);

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    const { data } = await PostApi.postLike(url, id);
    if (data.data) {
      setLike(data.data.status);
      if (data.data.status) setLikeCount(likeCount + 1);
      else setLikeCount(likeCount - 1);
    }
  };

  useEffect(() => {
    if (id) getPostLikeStatus();
  }, [id]);

  return (
    <Space className={styles.container} direction="vertical">
      <div className={styles.inContent}>
        <div className={styles.top}>
          <CommunityInfo daoInfo={dao} createTime={created_on} />

          <img
            className={styles.moreImg}
            src={moreImg}
            alt=""
            onClick={moreClick}
          />
        </div>

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
          commentOnNum={comment_count}
          likeNum={likeCount}
          likeStatus={like}
          likeHandle={postLike}
        />
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: '140px', borderRadius: '5px 5px 0 0' }}
      >
        <PopupContent handle={moreClick} post={props.post} />
      </Popup>
    </Space>
  );
};

export default GraphicMessage;
