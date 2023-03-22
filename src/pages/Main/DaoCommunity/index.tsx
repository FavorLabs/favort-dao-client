import * as React from 'react';
import { useEffect, useState } from 'react';
import { history, useParams, useSelector } from 'umi';
import styles from './index.less';
import DaoApi from '@/services/tube/Dao';
import ChatApi from '@/services/tube/Chat';
import { useUrl, useReviteUrl } from '@/utils/hooks';
import { DaoInfo, LastMsg, Page, Post, PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import CommunityCard from '@/components/CommunityCard';
import FavorDaoCard from '@/components/FavorDaoCard';
import MyCommunity from '@/components/MyCommunity';
import SvgIcon from '@/components/SvgIcon';
import newsImg from '@/assets/icon/daoNews.svg';
import videoImg from '@/assets/icon/daoVideo.svg';
import chatImg from '@/assets/icon/daoChat.svg';
import { getChatHash, getContent, getTime, toChat } from '@/utils/util';
import PostApi from '@/services/tube/PostApi';
import CommunityIntro from '@/components/CommunityIntro';
import KeepAlive from 'react-activation';
import { message } from 'antd';
import ErrorOccurred from '@/components/ErrorOccurred';
import { decodeTime } from 'ulid';

export type Props = {};

const DaoCommunity: React.FC<Props> = (props) => {
  const params: { daoId?: string } = useParams();
  const { api, config } = useSelector((state: Models) => state.global);
  const url = useUrl();
  const reviteUrl = useReviteUrl();

  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const [daoInfo, setDaoInfo] = useState<DaoInfo | null>(null);
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
    text: 'no chat',
    createTime: '',
  });
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 10,
    type: -1,
  });
  const [allDao, setAllDao] = useState<PostInfo[]>([]);
  const allId = '12345';
  const [activeId, setActiveId] = useState<string | undefined>(
    daoInfo?.id || allId,
  );
  const [errored, setErrored] = useState<boolean>(false);
  const daoId = params.daoId;

  const getDaoInfo = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.getById(url, daoId);
    if (data.data) {
      setDaoInfo(data.data);
      getMsgIdByName(data.data);

      if (data.data.last_posts.length) {
        data.data.last_posts.forEach((item) => {
          if (item.type === 0) {
            const obj = getContent(item.contents as Post[]);
            setLastPostNews({
              text: obj[2]?.[0]?.content,
              createTime: getTime(item.created_on),
            });
          } else if (item.type === 1) {
            const obj = getContent(item.contents as Post[]);
            setLastPostVideo({
              text: obj[1][0]?.content,
              createTime: getTime(item.created_on),
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
    }
  };

  const getBookmarkList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    let followList: React.SetStateAction<DaoInfo[]> = [];
    if (data.data.list.length) {
      followList = data.data.list;
    }
    setBookmarkList(followList);
  };

  const bookmarkHandle = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.bookmark(url, daoId);
    setIsBookmark(data.data.status);
    await getBookmarkList();
  };

  const checkBookmark = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.checkBookmark(url, daoId);
    setIsBookmark(data.data.status);
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
      if (data.data.list) {
        setAllDao(data.data.list);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setErrored(true);
    }
  };

  const getMsgIdByName = async (item: DaoInfo) => {
    const { data } = await ChatApi.getMsgIdByName(
      reviteUrl,
      getChatHash(item.name),
    );
    if (data?.last_message_id) getMsgById(item.name, data.last_message_id);
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
                        <span className={styles.text}>Information</span>
                      </div>
                      <div
                        className={styles.contentBox}
                        onClick={() => {
                          history.push(`/newsletterList/${daoId}`);
                        }}
                      >
                        <div className={styles.img}>
                          <SvgIcon svg={newsImg} />
                        </div>
                        <div className={styles.right}>
                          <div className={styles.leftText}>
                            <div className={styles.name}>News</div>
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
                          <SvgIcon svg={videoImg} />
                        </div>
                        <div className={styles.right}>
                          <div className={styles.leftText}>
                            <div className={styles.name}>Video</div>
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
                        <span className={styles.text}>channel</span>
                      </div>
                      <div
                        className={styles.contentBox}
                        onClick={() => {
                          toChat(daoInfo.name, api, config?.proxyGroup);
                        }}
                      >
                        <div className={styles.img}>
                          <SvgIcon svg={chatImg} />
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
              <div className={styles.createPage}>
                <div className={styles.noCreateBackGround}></div>
                <p className={styles.noCreateText}>
                  Nothing. Go create or join a community!
                </p>
              </div>
            )
          ) : (
            <div className={styles.viewDaoGroup}>
              {errored ? (
                <ErrorOccurred retryFn={getDaoList} />
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
