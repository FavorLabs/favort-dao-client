import * as React from 'react';
import { useEffect, useState } from 'react';
import { history, useParams, useSelector } from 'umi';
import styles from './index.less';
import DaoApi from '@/services/tube/Dao';
import ChatApi from '@/services/tube/Chat';
import { InfiniteScroll } from 'antd-mobile';
import { useUrl, useReviteUrl } from '@/utils/hooks';
import { DaoInfo, LastMsg, Page, Post, PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import CommunityCard from '@/components/CommunityCard';
import FavorDaoCard from '@/components/FavorDaoCard';
import MyCommunity from '@/components/MyCommunity';
import newsImg from '@/assets/icon/daoNews-icon.svg';
import videoImg from '@/assets/icon/daoVideo.svg';
import chatImg from '@/assets/icon/daoChat.svg';
import { getChatHash, getContent, getTime, toChat } from '@/utils/util';
import PostApi from '@/services/tube/PostApi';
import CommunityIntro from '@/components/CommunityIntro';
import KeepAlive from 'react-activation';
import { message } from 'antd';
import ErrorOccurred from '@/components/ErrorOccurred';
import { decodeTime } from 'ulid';
import DaoCardSkeleton from '@/components/CustomSkeleton/DaoDetailSkeleton/DaoCardSkeleton';
import DaoDetailSkeleton from '@/components/CustomSkeleton/DaoDetailSkeleton';
import _ from 'lodash';
import DetailSkeleton from '@/components/CustomSkeleton/PostSkeleton/DetailSkeleton';
import { useIntl } from '@@/plugin-locale/localeExports';

export type Props = {};

const DaoCommunity: React.FC<Props> = (props) => {
  const params: { daoId?: string } = useParams();
  const { api, config, settings } = useSelector(
    (state: Models) => state.global,
  );
  const url = useUrl();
  const reviteUrl = useReviteUrl();
  const intl = useIntl();

  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const [daoInfo, setDaoInfo] = useState<DaoInfo | null>(null);
  const [haveDaoInfo, setHaveDaoInfo] = useState<boolean>(false);
  const [isViewDaoGroup, setIsViewDaoGroup] = useState(false);
  const [lastPostNews, setLastPostNews] = useState({
    text: 'no news',
    createTime: '',
  });
  const [lastPostVideo, setLastPostVideo] = useState({
    text: 'no video',
    createTime: '',
  });
  const [lastChat, setLastChat] = useState({
    text: '',
    createTime: '',
  });
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 5,
    type: -1,
  });
  const [daoPageData, setDaoPageData] = useState<Page>({
    page: 1,
    page_size: 1000,
  });
  const [allDao, setAllDao] = useState<PostInfo[]>([]);
  const allId = '12345';
  const [activeId, setActiveId] = useState<string | undefined>(
    daoInfo?.id || allId,
  );
  const [errored, setErrored] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const daoId = params.daoId;
  const [guid, setGuid] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);

  const getGroupId = async (daoId: string) => {
    try {
      const { data } = await ChatApi.getGroupId(url, daoId);
      setGuid(data.data.list[0].guid);
    } catch (e) {}
  };

  const getDaoInfo = async () => {
    if (!daoId) return;
    setHaveDaoInfo(false);
    const { data } = await DaoApi.getById(url, daoId);
    if (data.data) {
      setHaveDaoInfo(true);
      setDaoInfo(data.data);
      // getMsgIdByName(data.data);
      getGroupId(daoId);
      processMessage(data.data);
    }
  };

  const processMessage = (arrData: DaoInfo) => {
    if (arrData.last_posts?.length > 1) {
      arrData.last_posts.forEach((item) => {
        let obj = getContent(item.contents as Post[]);
        if (item.type === 0) {
          setLastPostNews({
            text: obj[2]?.[0]?.content,
            createTime: getTime(item.created_on),
          });
        } else {
          setLastPostVideo({
            text: obj[1][0]?.content,
            createTime: getTime(item.created_on),
          });
        }
      });
    } else if (arrData.last_posts?.length === 1) {
      arrData.last_posts.forEach((item) => {
        let obj = getContent(item.contents as Post[]);
        if (item.type === 0) {
          setLastPostNews({
            text: obj[2]?.[0]?.content,
            createTime: getTime(item.created_on),
          });
          setLastPostVideo({
            text: 'no video',
            createTime: '',
          });
        } else {
          setLastPostVideo({
            text: obj[1][0]?.content,
            createTime: getTime(item.created_on),
          });
          setLastPostNews({
            text: 'no news',
            createTime: '',
          });
        }
      });
    } else {
      setLastPostNews({
        text: 'no news',
        createTime: '',
      });
      setLastPostVideo({
        text: 'no video',
        createTime: '',
      });
    }
  };

  const getBookmarkList = async () => {
    const { data } = await DaoApi.getBookmarkList(url, daoPageData);
    let followList: React.SetStateAction<DaoInfo[]> = [];
    if (data.data.list?.length) {
      followList = _.filter(data.data.list, (v) => v.id !== userInfo?.id);
      setBookmarkList(followList);
    }
  };

  const bookmarkHandle = async () => {
    if (!daoId) return;
    try {
      const { data } = await DaoApi.bookmark(url, daoId);
      await getBookmarkList();
      setIsBookmark(data.data.status);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const checkBookmark = async () => {
    if (!daoId) return;
    try {
      const { data } = await DaoApi.checkBookmark(url, daoId);
      setIsBookmark(data.data.status);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const viewDaoGroup = async () => {
    setIsViewDaoGroup(true);
    if (!isViewDaoGroup) {
      getDaoList();
    }
  };

  const getDaoList = async () => {
    try {
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      setErrored(false);
      if (data.data.list?.length) {
        setAllDao(() => [...allDao, ...data.data.list]);
        setHasMore(
          data.data.pager.total_rows > pageData.page * pageData.page_size,
        );
        setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setErrored(true);
    } finally {
      setFirstLoad(false);
    }
  };

  const getMsgIdByName = async (item: DaoInfo) => {
    try {
      const { data } = await ChatApi.getMsgIdByName(
        reviteUrl,
        getChatHash(item.name),
      );
      if (data?.last_message_id) getMsgById(item.name, data.last_message_id);
    } catch (e) {
      //
    }
  };

  const getMsgById = async (name: string, msgId: string) => {
    const { data } = await ChatApi.getMsgById(
      reviteUrl,
      getChatHash(name),
      msgId,
    );
    if (data) {
      setLastChat({
        text: data.content,
        createTime: getTime(decodeTime(data._id)),
      });
    } else {
      setLastChat({
        text: 'no chat',
        createTime: '',
      });
    }
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  useEffect(() => {
    checkBookmark();
    getDaoInfo();
    if (!daoId) {
      viewDaoGroup();
      setActiveId(allId);
    } else {
      setIsViewDaoGroup(false);
      setActiveId(daoId);
    }
  }, [daoId, bookmarkList]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <MyCommunity
            user={userInfo}
            joinedList={bookmarkList}
            daoId={daoId}
            activeId={activeId}
          />
        </div>

        <div className={styles.rightContent}>
          {!isViewDaoGroup ? (
            daoId ? (
              <>
                {haveDaoInfo ? (
                  <>
                    {daoInfo && (
                      <>
                        <div className={styles.card}>
                          <CommunityCard
                            status={isBookmark}
                            handle={bookmarkHandle}
                            daoInfo={daoInfo}
                          />
                        </div>

                        <div className={styles.information}>
                          <div className={styles.title}>
                            <div className={styles.disc} />
                            <span className={styles.text}>
                              {intl.formatMessage({
                                id: 'daoCommunity.Information.title',
                              })}
                            </span>
                          </div>
                          <div
                            className={styles.contentBox}
                            onClick={() => {
                              history.push(`/newsletterList/${daoId}`);
                            }}
                          >
                            <div className={styles.img}>
                              <img
                                src={newsImg}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                            <div className={styles.right}>
                              <div className={styles.leftText}>
                                <div className={styles.name}>
                                  {intl.formatMessage({
                                    id: 'daoCommunity.Information.news',
                                  })}
                                </div>
                                <div className={styles.message}>
                                  {lastPostNews.text}
                                </div>
                              </div>
                              <div className={styles.time}>
                                {lastPostNews.createTime}
                              </div>
                            </div>
                          </div>
                          <div
                            className={styles.contentBox}
                            onClick={() => {
                              history.push(`/videoList/${daoId}`);
                            }}
                          >
                            <div className={styles.img}>
                              <img
                                src={videoImg}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                            <div className={styles.right}>
                              <div className={styles.leftText}>
                                <div className={styles.name}>
                                  {intl.formatMessage({
                                    id: 'daoCommunity.Information.video',
                                  })}
                                </div>
                                <div className={styles.message}>
                                  {lastPostVideo.text}
                                </div>
                              </div>
                              <div className={styles.time}>
                                {lastPostVideo.createTime}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.information}>
                          <div className={styles.title}>
                            <div className={styles.disc} />
                            <span className={styles.text}>Channel</span>
                          </div>
                          <div
                            className={styles.contentBox}
                            onClick={() => {
                              if (isBookmark) {
                                if (!settings) return;
                                if (guid)
                                  toChat(
                                    daoInfo.name,
                                    api,
                                    config?.proxyGroup,
                                    guid,
                                    settings.Bucket,
                                    settings.TagRegion,
                                    settings.TagNetwork,
                                  );
                                else {
                                  message.error(
                                    `${intl.formatMessage({
                                      id: 'daoCommunity.message.general.error',
                                    })}`,
                                  );
                                }
                              } else {
                                message.warning(
                                  `${intl.formatMessage({
                                    id: 'daoCommunity.message.general.warning',
                                  })}`,
                                );
                              }
                            }}
                          >
                            <div className={styles.img}>
                              <img
                                src={chatImg}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                            <div className={styles.right}>
                              <div className={styles.leftText}>
                                <div className={styles.name}>General</div>
                                <div className={styles.message}>
                                  {lastChat.text}
                                </div>
                              </div>
                              <div className={styles.time}>
                                {lastChat.createTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <DaoDetailSkeleton />
                  </>
                )}
              </>
            ) : (
              <div className={styles.createPage}>
                <div className={styles.noCreateBackGround}></div>
                <p className={styles.noCreateText}>
                  {intl.formatMessage({
                    id: 'daoCommunity.createPage.noCreateText',
                  })}
                </p>
              </div>
            )
          ) : (
            <div className={styles.viewDaoGroup}>
              {errored ? (
                <ErrorOccurred retryFn={getDaoList} />
              ) : (
                <>
                  {firstLoad ? (
                    <>
                      <DaoCardSkeleton />
                      <DaoCardSkeleton />
                      <DaoCardSkeleton />
                      <DaoCardSkeleton />
                    </>
                  ) : (
                    <>
                      {allDao.map((item: any, index: number) => {
                        return (
                          <div key={index} className={styles.viewContent}>
                            {/*<FavorDaoCard daoInfo={item.dao} />*/}
                            <CommunityIntro post={item} />
                          </div>
                        );
                      })}
                      <InfiniteScroll loadMore={getDaoList} hasMore={hasMore}>
                        <>
                          {hasMore ? (
                            <div className={styles.loading}>
                              <DetailSkeleton />
                              <DetailSkeleton />
                            </div>
                          ) : (
                            <span>
                              {intl.formatMessage({
                                id: 'daoCommunity.infiniteScroll.bottom',
                              })}
                            </span>
                          )}
                        </>
                      </InfiniteScroll>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default () => {
  return (
    // @ts-ignore
    <KeepAlive when={true} saveScrollPosition={'screen'}>
      <DaoCommunity />
    </KeepAlive>
  );
};
