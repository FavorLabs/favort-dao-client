import * as React from 'react';
import styles from './index.less';
import { PostInfoRes, VideoRes } from '@/declare/tubeApiType';
import { useEffect, useState } from 'react';
import { useResourceUrl } from '@/utils/hooks';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {
  videoInfo: PostInfoRes;
  openThumb?: boolean;
};
const VideoCard: React.FC<Props> = (props) => {
  const { videoInfo, openThumb = true } = props;
  const resourceUrl = useResourceUrl();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');

  const { api } = useSelector((state: Models) => state.global);

  const contentType = {
    title: 1,
    thumbnail: 3,
    video: 4,
  };

  const getInfo = () => {
    videoInfo.contents.forEach((item) => {
      switch (item.type) {
        case contentType.title:
          setTitle(item.content);
          break;
        case contentType.thumbnail:
          setThumbnail(item.content);
          break;
        case contentType.video:
          setVSrc(item.content);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <figure className={styles.videoCard}>
          {openThumb ? (
            <div
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${resourceUrl}/${thumbnail})` }}
            />
          ) : (
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
          )}
          <figcaption className={styles.details}>
            <p className={styles.title}>{title}</p>
            <p className={styles.viewsDate}>
              <span className={styles.views}>{videoInfo.view_count} views</span>
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
