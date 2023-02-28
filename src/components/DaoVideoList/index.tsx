import * as React from 'react';
import styles from './index.less';
import { Row, Col, Divider, message } from 'antd';
import VideoCard from '@/components/VideoCard';
import { useHistory, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import { Models } from '@/declare/modelType';
import { usePath, useResourceUrl, useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';
import postApi from '@/services/tube/PostApi';

export type Props = {};

const DaoVideoList: React.FC<Props> = (props) => {
  // const path = usePath();
  const history = useHistory();
  const url = useUrl();
  const contentType = {
    title: 1,
    description: 2,
    video: 4,
  };
  // const resourceUrl = useResourceUrl();
  const [topVTitle, setTopVTitle] = useState('');
  const [topVDescription, setTopVDescription] = useState('');
  const [topVSrc, setTopVSrc] = useState('');
  const [videoList, setVideoList] = useState<PostInfo[]>([]);

  const { api } = useSelector((state: Models) => state.global);
  const { info } = useSelector((state: Models) => state.dao);
  const { refreshVideoList } = useSelector((state: Models) => state.manage);

  const getList = async () => {
    const { data } = await postApi.getPostListByAddress(
      url,
      info?.address as string,
      {
        page: 1,
        page_size: 10,
        type: 1,
      },
    );
    if (data.data) {
      const arr = data.data.list;
      if (arr.length) {
        const temp = arr.filter((item: any) => {
          if (item.type === 1) return item;
        });
        setVideoList(temp);
      }
    }
  };

  const getInfo = () => {
    videoList[0]?.contents.forEach((item) => {
      switch (item.type) {
        case contentType.title:
          setTopVTitle(item.content);
          break;
        case contentType.description:
          setTopVDescription(item.content);
          break;
        case contentType.video:
          setTopVSrc(item.content);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    getList();
  }, [refreshVideoList]);

  useEffect(() => {
    if (videoList.length) {
      getInfo();
    }
  }, [videoList]);

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
                      key={topVSrc}
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '500px',
                      }}
                    >
                      <source
                        src={api + '/file/' + topVSrc}
                        type={'video/mp4'}
                      />
                    </video>
                  </div>
                </Col>
                <Col>
                  <figcaption className={styles.details}>
                    <p className={styles.title}>{topVTitle}</p>
                    <p className={styles.viewsDate}>
                      <span className={styles.views}>{0} views</span>
                      <span className={styles.separator}>&bull;</span>
                      <span className={styles.date}>
                        {/*{videoList[0]?.createdAt}*/}
                      </span>
                    </p>
                    <p className={styles.description}>{topVDescription}</p>
                    <span
                      className={styles.readMore}
                      onClick={() => {
                        history.push(`/video/${videoList[0].id}`);
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

export default DaoVideoList;
