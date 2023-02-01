import * as React from 'react';
import styles from './index.less';
import { Row, Col, Divider } from 'antd';
import Video, { video } from '@/config/temp';
import VideoCard from '@/components/VideoCard';
import { useHistory, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import ProxyApi from '@/services/ProxyApi';
import { Models } from '@/declare/modelType';
import { usePath, useUrl } from '@/utils/hooks';
import { VideoRes, VideoListRes } from '@/declare/api';

export type Props = {};

const ChannelHome: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();
  const [videoList, setVideoList] = useState<VideoRes[]>([]);

  const { channelInfo } = useSelector((state: Models) => state.global);

  const getVideoList = async () => {
    const { data } = await ProxyApi.getVideos(url, {
      page: 1,
      count: 1000,
      channelId: channelInfo._id,
    });
    if (data.data.list) {
      setVideoList(data.data.list);
    }
  };

  useEffect(() => {
    if (channelInfo._id) {
      getVideoList();
    }
  }, [channelInfo]);

  return (
    <>
      <div className={styles.content}>
        <header>
          <figure className={styles.topVideo}>
            <Row
              gutter={[20, 20]}
              justify={{ xs: 'center', md: 'center', lg: 'start' }}
            >
              <Col className={styles.thumbnailCol}>
                <div
                  className={styles.thumbnail}
                  onClick={() => {
                    path(`video/${videoList[0].id}`);
                  }}
                  style={{ backgroundImage: `url(${videoList[0]?.thumbnail})` }}
                ></div>
              </Col>
              <Col>
                <figcaption className={styles.details}>
                  <p className={styles.title}>{videoList[0]?.title}</p>
                  <p className={styles.viewsDate}>
                    <span className={styles.views}>{0} views</span>
                    <span className={styles.separator}>&bull;</span>
                    <span className={styles.date}>
                      {videoList[0]?.createdAt}
                    </span>
                  </p>
                  <p className={styles.description}>
                    {videoList[0]?.description}
                  </p>
                  <span
                    className={styles.readMore}
                    onClick={() => {
                      path(`video/${videoList[0].id}`);
                    }}
                  >
                    Read More
                  </span>
                </figcaption>
              </Col>
            </Row>
          </figure>
        </header>
        <Divider />
        <main>
          <section className={styles.allVideos}>
            <p className={styles.title}>All Videos</p>
          </section>
          <div className={styles.channelVideos}>
            <Row
              gutter={[10, 20]}
              justify={{ xs: 'center', sm: 'center', md: 'start' }}
            >
              {videoList.map((item, index) => {
                return (
                  <Col
                    key={index}
                    sm={{ span: 16 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xl={{ span: 6 }}
                    onClick={() => {
                      path(`video/${item.id}`);
                    }}
                  >
                    <VideoCard videoInfo={item} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChannelHome;
