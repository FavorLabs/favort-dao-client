import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Avatar, Button } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import VideoInfo, { video } from '@/config/temp';
import VideoCard from '@/components/VideoCard';
import { history } from '@@/core/history';

export type Props = {
  match: {
    params: {
      id: string;
    };
  };
};
const Video: React.FC<Props> = (props) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoList, setVideoList] = useState<video[]>([]);

  const getVideoById = (id: string) => {
    setVideoUrl(VideoInfo.url);
  };

  const getVideoList = () => {
    const arr: video[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(VideoInfo);
    }
    setVideoList(arr);
  };

  useEffect(() => {
    getVideoById(props.match.params.id);
    getVideoList();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <header>
          <div className={styles.topBar}>
            <div className={styles.logo}>FavorTube</div>
          </div>
        </header>
        <main className={styles.VideoMain}>
          <Row
            gutter={[30, 20]}
            className={styles.row}
            justify={{ md: 'center', xl: 'start' }}
          >
            <Col xl={{ span: 18 }} className={styles.col}>
              <div className={styles.mainLeft}>
                <figure>
                  <div className={styles.player}>
                    <video
                      controls
                      autoPlay={false}
                      playsInline
                      style={{ width: '100%', height: '100%' }}
                    >
                      <source src={videoUrl} type={'video/mp4'} />
                    </video>
                  </div>
                  <figcaption className={styles.detail}>
                    <p className={styles.title}>{VideoInfo.title}</p>
                    <div className={styles.userActions}>
                      <div className={styles.left}>
                        <Avatar
                          className={styles.avatar}
                          size={40}
                          style={{
                            backgroundColor: '#F44336',
                            fontSize: '14px',
                          }}
                        >
                          U
                        </Avatar>
                        <div className={styles.channelDetail}>
                          <p className={styles.name}>User</p>
                          <p className={styles.subscribers}>10 subscribers</p>
                        </div>
                        <Button
                          className={styles.subscribe}
                          type="primary"
                          shape="round"
                        >
                          Subscribe
                        </Button>
                      </div>
                      <div className={styles.right}>
                        <span className={styles.likeOrDislikeOrShare}>
                          <span>
                            <LikeOutlined
                              className={`${styles.like} ${styles.actionBtn}`}
                            />
                            {VideoInfo.like}
                          </span>
                          <span>
                            <DislikeOutlined
                              className={`${styles.dislike} ${styles.actionBtn}`}
                            />
                            {VideoInfo.dislike}
                          </span>
                          <span>
                            <ShareAltOutlined
                              className={`${styles.share} ${styles.actionBtn}`}
                            />
                            Share
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className={styles.extra}>
                      <p className={styles.viewsAndDate}>
                        <span className="views">{VideoInfo.views} views</span>
                        <span className="date">
                          {VideoInfo.date.toString()}
                        </span>
                      </p>
                      <p className={styles.description}>
                        {VideoInfo.description}
                      </p>
                    </div>
                  </figcaption>
                </figure>
                <div className={styles.comments}>Comments</div>
              </div>
            </Col>
            <Col md={{ span: 20 }} lg={{ span: 16 }} xl={{ span: 6 }}>
              <aside className={styles.mainRight}>
                {videoList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        history.push(`/video/${item.id}`);
                      }}
                    >
                      <VideoCard videoInfo={item} />
                    </div>
                  );
                })}
              </aside>
            </Col>
          </Row>
        </main>
      </div>
    </>
  );
};

export default Video;
