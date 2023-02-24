import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Avatar, Button, message } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useSelector, useHistory } from 'umi';
import VideoCard from '@/components/VideoCard';
import { usePath, useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import postApi from '@/services/tube/PostApi';

export type Props = {
  match: {
    params: {
      vid: string;
    };
  };
};
const Video: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();
  const history = useHistory();

  const [videoData, setVideoData] = useState<PostInfo | null>(null);
  const [videoList, setVideoList] = useState<PostInfo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');

  const { api } = useSelector((state: Models) => state.global);
  // const { channelInfo } = useSelector((state: Models) => state.channel);

  const contentType = {
    title: 1,
    description: 2,
    thumbnail: 3,
    video: 4,
  };

  const getVideoById = async (id: string) => {
    try {
      const { data } = await postApi.getPostById(url, id);
      if (data.data) {
        setVideoData(data.data);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const getVideoList = async () => {
    const { data } = await postApi.getPostListByType(url, {
      page: 1,
      page_size: 12,
      type: 1,
    });
    if (data.data.list) {
      setVideoList(data.data.list);
    }
  };
  console.log('videoData', videoData);

  const getInfo = () => {
    videoData?.contents?.forEach((item) => {
      switch (item.type) {
        case contentType.title:
          setTitle(item.content);
          break;
        case contentType.description:
          setDescription(item.content);
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
    getVideoById(props.match.params.vid);
    getVideoList();
  }, [props.match.params.vid]);

  useEffect(() => {
    if (videoData) {
      getInfo();
    }
  }, [videoData]);

  return (
    <>
      <div className={styles.content}>
        <header className={'header'}>
          <div className={styles.topBar}>
            <span
              className={styles.goBack}
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowLeftOutlined />
            </span>
            <div
              className={styles.logo}
              onClick={() => {
                // path('');
              }}
            >
              FavorDao
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
                <figure style={{ margin: 0 }}>
                  {vSrc ? (
                    <div className={styles.player}>
                      <video
                        controls
                        autoPlay={true}
                        playsInline
                        key={vSrc}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '500px',
                          borderRadius: '4px',
                        }}
                      >
                        <source
                          src={api + '/file/' + vSrc}
                          type={'video/mp4'}
                        />
                      </video>
                    </div>
                  ) : (
                    <div className={styles.skeleton}></div>
                  )}
                  <figcaption className={styles.detail}>
                    <p className={styles.title}>{title}</p>
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
                          src={videoData?.user?.avatar}
                        >
                          {videoData?.user?.nickname
                            ? videoData?.user?.nickname
                                ?.toUpperCase()
                                .substr(0, 1)
                            : 'U'}
                        </Avatar>
                        <div className={styles.channelDetail}>
                          <p className={styles.name}>
                            {videoData?.user?.nickname
                              ? videoData?.user?.nickname
                              : 'User'}
                          </p>
                          <p className={styles.subscribers}>0 subscribers</p>
                        </div>
                        {/*<Button*/}
                        {/*  className={styles.subscribe}*/}
                        {/*  type="primary"*/}
                        {/*  shape="round"*/}
                        {/*>*/}
                        {/*  Subscribe*/}
                        {/*</Button>*/}
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
                          {/*{videoData?.updatedAt}*/}
                        </span>
                      </p>
                      <p className={styles.description}>{description}</p>
                    </div>
                  </figcaption>
                </figure>
                <div className={styles.comments}>Comments</div>
              </div>
            </Col>
            <Col
              md={{ span: 20 }}
              lg={{ span: 16 }}
              xl={{ span: 6 }}
              className={styles.col}
            >
              <aside className={styles.mainRight}>
                {videoList.map((item, index) => {
                  return (
                    item.type === 1 && (
                      <div
                        key={index}
                        onClick={() => {
                          path(`/video/${item.id}`);
                        }}
                      >
                        <VideoCard videoInfo={item} />
                      </div>
                    )
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
