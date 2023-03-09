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
import { usePath, useResourceUrl, useUrl } from '@/utils/hooks';
import { Post, PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import DaoApi from '@/services/tube/Dao';
import { getContent } from '@/utils/util';
import UserAvatar from '@/components/UserAvatar';
import CommentArea from '@/components/CommentArea';

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
  const avatarsResUrl = useResourceUrl('avatars');
  const history = useHistory();

  const [videoData, setVideoData] = useState<PostInfo | null>(null);
  const [videoList, setVideoList] = useState<PostInfo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');
  const [joined, setJoined] = useState<boolean>(false);

  const { api } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getVideoById = async (id: string) => {
    try {
      const { data } = await PostApi.getPostById(url, id);
      if (data.data) {
        setVideoData(data.data);
        checkJoinStatus(data.data.dao.id);
        getVideoList(data.data.address);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const getVideoList = async (address: string) => {
    const { data } = await PostApi.getPostListByAddress(url, address, {
      page: 1,
      page_size: 12,
      type: 1,
    });
    if (data.data.list) {
      setVideoList(data.data.list);
    }
  };

  const getInfo = () => {
    const obj = getContent(videoData?.contents as Post[]);
    setTitle(obj[1][0]?.content);
    setDescription(obj[2][0]?.content);
    setThumbnail(obj[3][0]?.content);
    setVSrc(obj[4][0]?.content);
  };

  const joinDao = () => {};

  const checkJoinStatus = async (id: string) => {
    const { data } = await DaoApi.checkBookmark(url, id);
    if (data.data) {
      setJoined(data.data.status);
    }
  };

  useEffect(() => {
    getVideoById(props.match.params.vid);
  }, [props.match.params.vid]);

  useEffect(() => {
    if (videoData) {
      getInfo();
    }
  }, [videoData]);

  return (
    <>
      <div className={styles.content}>
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
        <main className={styles.VideoMain}>
          <Row
            gutter={[30, 20]}
            className={styles.row}
            justify={{ md: 'center', xl: 'start' }}
          >
            <Col xl={{ span: 18 }} className={styles.col}>
              <div className={styles.mainLeft}>
                <figure style={{ margin: 0 }}>
                  {videoData ? (
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
                          borderRadius: '0px',
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
                    {videoData && (
                      <>
                        <div className={styles.info}>
                          <div className={styles.left}>
                            <UserAvatar
                              prefix={avatarsResUrl}
                              name={videoData.dao.name}
                              identifier={videoData.dao.avatar}
                            />
                            <div className={styles.text}>
                              <div className={styles.daoName}>
                                {videoData.dao.name}
                              </div>
                              <div className={styles.subscribe}>
                                {0} followers
                              </div>
                            </div>
                          </div>
                          <div className={styles.joinBtn} onClick={joinDao}>
                            join
                          </div>
                        </div>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.desc}>{description}</div>
                        <CommentArea
                          watchNum={videoData.view_count}
                          commentOnNum={0}
                          likeNum={videoData.upvote_count}
                        />
                      </>
                    )}
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
                        <VideoCard post={item} />
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
