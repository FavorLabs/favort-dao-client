import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector, useHistory } from 'umi';
import VideoCard from '@/components/VideoCard';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { Post, PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import DaoApi from '@/services/tube/Dao';
import { getContent } from '@/utils/util';
import UserAvatar from '@/components/UserAvatar';
import CommentArea from '@/components/CommentArea';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';

export type Props = {
  match: {
    params: {
      vid: string;
    };
  };
};
const Video: React.FC<Props> = (props) => {
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const history = useHistory();

  const { vid } = props.match.params;

  const [videoData, setVideoData] = useState<PostInfo | null>(null);
  const [videoList, setVideoList] = useState<PostInfo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');
  const [joined, setJoined] = useState<boolean>(false);
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [focusDialog, setFocusDialog] = useState<boolean>(false);

  const { api } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getVideoById = async (id: string) => {
    try {
      const { data } = await PostApi.getPostById(url, id);
      if (data.data) {
        const daoId = data.data.dao.id;
        const isSelf = daoId === userInfo?.id;
        setVideoData(data.data);
        setIsSelf(isSelf);
        !isSelf && checkJoinStatus(daoId);
        // getVideoList(daoId);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const getVideoList = async (daoId: string) => {
    const { data } = await PostApi.getPostListByDaoId(url, daoId, {
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

  const joinDao = async () => {
    if (joined) {
      setFocusDialog(true);
    } else {
      try {
        const { data } = await DaoApi.bookmark(
          url,
          videoData?.dao?.id as string,
        );
        if (data.data) {
          setJoined(data.data.status);
        }
      } catch (e) {
        if (e instanceof Error) message.error(e.message);
      }
    }
  };

  const confirmFocus = async () => {
    try {
      const { data } = await DaoApi.bookmark(url, videoData?.dao?.id as string);
      setJoined(data.data.status);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setFocusDialog(false);
    }
  };

  const checkJoinStatus = async (id: string) => {
    const { data } = await DaoApi.checkBookmark(url, id);
    if (data.data) {
      setJoined(data.data.status);
    }
  };

  useEffect(() => {
    if (vid) {
      getVideoById(vid);
    }
  }, [vid]);

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
            {/*FavorDao*/}
          </div>
        </div>
        <main className={styles.VideoMain}>
          <Row
            gutter={[30, 20]}
            className={styles.row}
            justify={{ md: 'center', xl: 'start' }}
          >
            <Col xl={{ span: 24 }} className={styles.col}>
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
                    <div className={styles.videoSkeleton} />
                  )}
                  <figcaption className={styles.detail}>
                    {videoData ? (
                      <>
                        <div className={styles.info}>
                          <div
                            className={styles.left}
                            onClick={() => {
                              history.push(`/dao/${videoData.dao.id}`);
                            }}
                          >
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
                          {!isSelf && (
                            <div className={styles.joinBtn} onClick={joinDao}>
                              {joined ? 'joined' : 'join'}
                            </div>
                          )}
                        </div>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.desc}>{description}</div>
                        <CommentArea
                          watchNum={videoData.view_count}
                          commentOnNum={videoData.comment_count}
                          likeNum={videoData.upvote_count}
                          postId={videoData.id}
                          postType={videoData.type}
                        />
                      </>
                    ) : (
                      <div className={styles.detailSkeleton} />
                    )}
                  </figcaption>
                </figure>
                <div className={styles.comments}>Comments</div>
              </div>
            </Col>
            {/*<Col*/}
            {/*  md={{ span: 20 }}*/}
            {/*  lg={{ span: 16 }}*/}
            {/*  xl={{ span: 24 }}*/}
            {/*  className={styles.col}*/}
            {/*>*/}
            {/*  <aside className={styles.mainRight}>*/}
            {/*    {videoList.map((item, index) => {*/}
            {/*      return (*/}
            {/*        <div*/}
            {/*          key={index}*/}
            {/*          onClick={() => {*/}
            {/*            history.push(`/video/${item.id}`);*/}
            {/*          }}*/}
            {/*        >*/}
            {/*          <VideoCard post={item} />*/}
            {/*        </div>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </aside>*/}
            {/*</Col>*/}
          </Row>
        </main>
        <ExitCommunityDialog
          text={''}
          visible={focusDialog}
          closeDialog={() => {
            setFocusDialog(false);
          }}
          confirmHandle={confirmFocus}
        />
      </div>
    </>
  );
};

export default Video;
