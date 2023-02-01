import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Avatar, Button, message } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useSelector } from 'umi';
import VideoCard from '@/components/VideoCard';
import { usePath, useUrl } from '@/utils/hooks';
import ProxyApi from '@/services/ProxyApi';
import { VideoRes, VideoListRes } from '@/declare/api';
import { Models } from '@/declare/modelType';

export type Props = {
  match: {
    params: {
      id: string;
    };
  };
};
const Video: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();

  const [videoData, setVideoData] = useState<VideoRes | null>(null);
  const [videoList, setVideoList] = useState<VideoRes[]>([]);

  const { api, channelInfo } = useSelector((state: Models) => state.global);

  const getVideoById = async (id: string) => {
    try {
      const { data } = await ProxyApi.getVideo(url, id);
      if (data.data) {
        setVideoData(data.data);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const getVideoList = async () => {
    const { data } = await ProxyApi.getVideos(url, {
      page: 1,
      count: 12,
      channelId: channelInfo._id,
    });
    if (data.data.list) {
      setVideoList(data.data.list);
    }
  };

  useEffect(() => {
    getVideoById(props.match.params.id);
    getVideoList();
  }, [props.match.params.id]);

  return (
    <>
      <div className={`${styles.content} pageContent`}>
        <header className={'header'}>
          <div className={styles.topBar}>
            <div
              className={styles.logo}
              onClick={() => {
                path('');
              }}
            >
              FavorTube
            </div>
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
                  {videoData?.hash ? (
                    <div className={styles.player}>
                      <video
                        controls
                        autoPlay={true}
                        playsInline
                        key={videoData?.hash}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '500px',
                        }}
                      >
                        <source
                          src={api + '/file/' + videoData?.hash}
                          type={'video/mp4'}
                        />
                      </video>
                    </div>
                  ) : (
                    <div className={styles.skeleton}></div>
                  )}
                  <figcaption className={styles.detail}>
                    <p className={styles.title}>{videoData?.title}</p>
                    <div className={styles.userActions}>
                      <div className={styles.left}>
                        <Avatar
                          className={styles.avatar}
                          size={40}
                          style={{
                            backgroundColor: '#F44336',
                            fontSize: '14px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            path('');
                          }}
                          src={channelInfo?.avatar}
                        >
                          {channelInfo?.name?.toUpperCase().substr(0, 1)}
                        </Avatar>
                        <div className={styles.channelDetail}>
                          <p className={styles.name}>
                            {videoData?.channelId.name
                              ? videoData?.channelId.name
                              : 'User'}
                          </p>
                          <p className={styles.subscribers}>0 subscribers</p>
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
                            {0}
                          </span>
                          <span>
                            <DislikeOutlined
                              className={`${styles.dislike} ${styles.actionBtn}`}
                            />
                            {0}
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
                        <span className={styles.views}>{0} views</span>
                        <span className={styles.date}>
                          {videoData?.updatedAt}
                        </span>
                      </p>
                      <p className={styles.description}>
                        {videoData?.description}
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
                        path(`/video/${item.id}`);
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
