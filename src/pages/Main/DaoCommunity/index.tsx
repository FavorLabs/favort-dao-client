import * as React from 'react';
import { useEffect, useState } from 'react';
import { history, useParams, useSelector } from 'umi';
import styles from './index.less';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo, Page, Post, PostInfo } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import CommunityCard from '@/components/CommunityCard';
import FavorDaoCard from '@/components/FavorDaoCard';
import _ from 'lodash';
import MyCommunity from '@/components/MyCommunity';
import SvgIcon from '@/components/SvgIcon';
import newsImg from '@/assets/icon/daoNews.svg';
import videoImg from '@/assets/icon/daoVideo.svg';
import chatImg from '@/assets/icon/daoChat.svg';
import { getContent, getTime, toChat } from '@/utils/util';
import PostApi from '@/services/tube/PostApi';
import CommunityIntro from '@/components/CommunityIntro';

export type Props = {};

const DaoCommunity: React.FC<Props> = (props) => {
  const params: { daoId?: string } = useParams();
  const { api, config } = useSelector((state: Models) => state.global);
  const url = useUrl();

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

  const daoId = params.daoId;

  const getDaoInfo = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.getById(url, daoId);
    if (data.data) {
      setDaoInfo(data.data);

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
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      if (data.data.list) {
        setAllDao(data.data.list);
      }
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
                              To better support the...
                            </div>
                          </div>
                          <div className={styles.time}>08:23am</div>
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
              {allDao.map((item: any, index: number) => {
                return (
                  <div key={index} className={styles.viewContent}>
                    {/*<FavorDaoCard daoInfo={item.dao} />*/}
                    <CommunityIntro post={item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DaoCommunity;
