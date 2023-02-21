import * as React from 'react';
import styles from './index.less';
import { Row, Col, Divider, message } from 'antd';
import VideoCard from '@/components/VideoCard';
import { useHistory, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import VideoApi from '@/services/tube/VideoApi';
import { Models } from '@/declare/modelType';
import { usePath, useUrl } from '@/utils/hooks';
import { VideoRes } from '@/declare/tubeApiType';
import postApi from '@/services/tube/PostApi';

export type Props = {};

const ChannelHome: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();
  const [videoList, setVideoList] = useState<VideoRes[]>([]);

  const { api } = useSelector((state: Models) => state.global);
  const { channelInfo } = useSelector((state: Models) => state.channel);

  const getVideoList = async () => {
    // try {
    //   const { data } = await VideoApi.getVideos(url, {
    //     page: 1,
    //     count: 1000,
    //     channelId: channelInfo?._id as string,
    //   });
    //   if (data.data.list.length > 0) {
    //     setVideoList(data.data.list);
    //   }
    // } catch (e) {
    //   if (e instanceof Error) message.error(e.message);
    // }
  };

  const getList = async () => {
    const { data } = await postApi.getPostListByAddress(
      url,
      '0xE28E429D3616Bb77Bee108FF943030B3311b4Ec3',
    );
    if (data.data) {
      setVideoList(data.data.list);
    }
  };

  useEffect(() => {
    // getVideoList();
    getList();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <header>
          <figure className={styles.topVideo}>
            <p className={styles.title}>Top Video</p>
            {videoList[0] ? (
              <Row
                gutter={[20, 20]}
                justify={{ xs: 'center', md: 'center', lg: 'start' }}
              >
                <Col className={styles.thumbnailCol}>
                  {/*<div*/}
                  {/*  className={styles.thumbnail}*/}
                  {/*  onClick={() => {*/}
                  {/*    path(`video/${videoList[0].id}`);*/}
                  {/*  }}*/}
                  {/*  style={{*/}
                  {/*    backgroundImage: `url(${videoList[0]?.thumbnail})`,*/}
                  {/*  }}*/}
                  {/*></div>*/}
                  <div className={styles.player}>
                    <video
                      controls
                      autoPlay={false}
                      playsInline
                      key={videoList[0]?.hash}
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '500px',
                      }}
                    >
                      <source
                        src={
                          api +
                          '/file/' +
                          videoList[0]?.hash +
                          '?oracles=' +
                          videoList[0]?.overlay
                        }
                        type={'video/mp4'}
                      />
                    </video>
                  </div>
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
                        path(`/videos/video/${videoList[0].id}`);
                      }}
                    >
                      Read More
                    </span>
                  </figcaption>
                </Col>
              </Row>
            ) : (
              <></>
            )}
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
                    style={{ width: '100%' }}
                    onClick={() => {
                      path(`/videos/video/${item.id}`);
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
