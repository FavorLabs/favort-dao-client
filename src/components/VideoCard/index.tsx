import * as React from 'react';
import styles from './index.less';
import { Post, PostInfo } from '@/declare/tubeApiType';
import { useEffect, useState } from 'react';
import { useResourceUrl } from '@/utils/hooks';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { getContent } from '@/utils/util';

export type Props = {
  post: PostInfo;
  openThumb?: boolean;
};
const VideoCard: React.FC<Props> = (props) => {
  const { post, openThumb = true } = props;
  const resourceUrl = useResourceUrl('images');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');

  const { api } = useSelector((state: Models) => state.global);

  const getInfo = () => {
    const obj = getContent(post?.contents as Post[]);
    setTitle(obj[1][0]?.content);
    setThumbnail(obj[3][0]?.content);
    setVSrc(obj[4][0]?.content);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <figure className={styles.videoCard}>
          {openThumb && thumbnail ? (
            <div
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${resourceUrl}/${thumbnail})` }}
            />
          ) : (
            vSrc && (
              <div className={styles.player}>
                <video
                  controls
                  autoPlay={false}
                  playsInline
                  key={vSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                  }}
                >
                  <source src={api + '/file/' + vSrc} type={'video/mp4'} />
                </video>
              </div>
            )
          )}
          <figcaption className={styles.details}>
            <p className={styles.title}>{title}</p>
            <p className={styles.viewsDate}>
              <span className={styles.views}>{post.view_count} views</span>
              <span className={styles.separator}>&bull;</span>
              {/*<span className={styles.date}>{videoInfo?.createdAt}</span>*/}
            </p>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default VideoCard;
