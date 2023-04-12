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
import Comment from '@/components/Comment';
import DetailSkeleton from '@/components/CustomSkeleton/PostSkeleton/DetailSkeleton';
import CommentSkeleton from '@/components/CustomSkeleton/CommentSkeleton';
import ChunkSourceInfoPopup from '@/components/ChunkSourceInfoPopup';
import TopNavBar from '@/components/TopNavBar';
import resourceSvg from '@/assets/icon/resource.svg';
import { useIntl } from '@@/plugin-locale/localeExports';
import JoinButton from '@/components/JoinButton';

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
  const intl = useIntl();

  const { vid } = props.match.params;

  const [videoData, setVideoData] = useState<PostInfo | null>(null);
  const [videoList, setVideoList] = useState<PostInfo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [chunkVisible, setChunkVisible] = useState<boolean>(false);
  const [videoHash, setVideoHash] = useState<string>('');
  const [oracleArr, setOracleArr] = useState<string[]>([]);
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);

  const { api } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getVideoById = async (id: string) => {
    try {
      const { data } = await PostApi.getPostById(url, id);
      if (data.data) {
        const daoId = data.data.dao.id;
        const isSelf = daoId === userInfo?.id;
        setVideoData(data.data);
        if (data.data.author_dao.id) setIsReTransfer(true);
        setIsSelf(isSelf);
        // !isSelf && checkJoinStatus(daoId);
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
    const obj = getContent(
      videoData?.type === 2
        ? (videoData.orig_contents as Post[])
        : (videoData?.contents as Post[]),
    );
    setTitle(obj[1][0]?.content);
    setDescription(obj[2][0]?.content);
    setThumbnail(obj[3][0]?.content);
    setVSrc(obj[4][0]?.content);
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

  useEffect(() => {
    if (vSrc) {
      if (vSrc.includes('?')) {
        const temp = vSrc.split('?');
        setVideoHash(temp[0]);
        setOracleArr([temp[1].split('=')[1]]);
      }
    }
  }, [vSrc]);

  return (
    <>
      <div className={styles.content}>
        <TopNavBar
          title={''}
          right={
            <img
              src={resourceSvg}
              alt={''}
              onClick={() => {
                setChunkVisible(true);
              }}
            />
          }
        />
        <main className={styles.VideoMain}>
          <Row
            gutter={[30, 20]}
            className={styles.row}
            justify={{ md: 'center', xl: 'start' }}
          >
            <Col xl={{ span: 24 }} className={styles.col}>
              <div className={styles.mainLeft}>
                {videoData ? (
                  <>
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
                              maxHeight: '31.25rem',
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
                        <div className={styles.info}>
                          <div className={styles.left}>
                            <div className={styles.leftL}>
                              <UserAvatar
                                prefix={avatarsResUrl}
                                name={
                                  isReTransfer
                                    ? videoData.author_dao.name
                                    : videoData.dao.name
                                }
                                identifier={
                                  isReTransfer
                                    ? videoData.author_dao.avatar
                                    : videoData.dao.avatar
                                }
                                onClick={() => {
                                  history.push(
                                    `/daoCommunity/${videoData.author_dao.id}`,
                                  );
                                }}
                              />
                              <div className={styles.text}>
                                <div className={styles.daoName}>
                                  <div
                                    onClick={() => {
                                      history.push(
                                        `/daoCommunity/${videoData.author_dao.id}`,
                                      );
                                    }}
                                  >
                                    {isReTransfer
                                      ? videoData.author_dao.name
                                      : videoData.dao.name}
                                  </div>
                                  {(videoData.type === 2 ||
                                    videoData.type === 3) && (
                                    <div
                                      className={styles.ref}
                                      onClick={() => {
                                        history.push(
                                          `/daoCommunity/${videoData.dao.id}`,
                                        );
                                      }}
                                    >
                                      <span className={styles.text}>
                                        {intl.formatMessage({
                                          id: 'reTransfer.text',
                                        })}
                                      </span>
                                      <div className={styles.nickName}>
                                        {userInfo?.id === videoData.dao.id
                                          ? `${intl.formatMessage({
                                              id: 'reTransfer.daoName',
                                            })}`
                                          : `${videoData.dao.name}`}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className={styles.subscribe}>
                                  {isReTransfer
                                    ? videoData.author_dao.follow_count
                                    : videoData.dao.follow_count}
                                  {intl.formatMessage({
                                    id: 'video.followCount',
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          {!isSelf && (
                            <JoinButton
                              isRefresh={true}
                              daoId={videoData?.dao?.id}
                            />
                          )}
                        </div>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.desc}>{description}</div>
                        <div className={styles.operation}>
                          <CommentArea
                            watchNum={videoData.view_count}
                            commentOnNum={videoData.comment_count}
                            likeNum={videoData.upvote_count}
                            postId={videoData.id}
                            postType={videoData.type}
                            post={videoData}
                          />
                        </div>
                      </figcaption>
                    </figure>
                    <div className={styles.comments}>
                      <Comment
                        postId={videoData.id}
                        postType={videoData.type}
                        postCommentCount={videoData.comment_count}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles.skeleton}>
                    <DetailSkeleton />
                    <CommentSkeleton />
                  </div>
                )}
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

        {chunkVisible && (
          <ChunkSourceInfoPopup
            visible={chunkVisible}
            close={() => {
              setChunkVisible(false);
            }}
            videoHash={videoHash}
            oracleArr={oracleArr}
          />
        )}
      </div>
    </>
  );
};

export default Video;
