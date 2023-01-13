import * as React from 'react';
import styles from './index.less';
import { Row, Col, Divider } from 'antd';
import Video, { video } from '@/config/temp';
import VideoCard from '@/components/VideoCard';
import { useHistory, history } from 'umi';

export type Props = {};

const ChannelHome: React.FC<Props> = (props) => {
  // const history = useHistory();

  const getChannelVideos = () => {
    const arr: video[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Video);
    }
    return arr;
  };

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
                  style={{ backgroundImage: `url(${Video.thumbnailUrl})` }}
                ></div>
              </Col>
              <Col>
                <figcaption className={styles.details}>
                  <p className={styles.title}>{Video.title}</p>
                  <p className={styles.viewsDate}>
                    <span className={styles.views}>{Video.views} views</span>
                    <span className={styles.separator}>&bull;</span>
                    <span className={styles.date}>{Video.date.toString()}</span>
                  </p>
                  <p className={styles.description}>{Video.description}</p>
                  <span className={styles.readMore} onClick={() => {}}>
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
              {getChannelVideos().map((item, index) => {
                return (
                  <Col
                    key={index}
                    sm={{ span: 16 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xl={{ span: 6 }}
                    onClick={() => {
                      history.push(`/video/${item.id}`);
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
