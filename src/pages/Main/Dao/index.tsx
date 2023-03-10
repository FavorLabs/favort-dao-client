import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { history, useParams, useSelector } from 'umi';
import styles from './index.less';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { DaoInfo } from '@/declare/tubeApiType';
import { useDebounceFn } from 'ahooks';
import { Models } from '@/declare/modelType';
import MyAttention from '@/components/MyAttention';
import CommunityCard from '@/components/CommunityCard';
import JumpIconButton from '@/components/JumpIconButton';
import addImg from '@/assets/img/add-img.png';
import newsInBriefImg from '@/assets/img/newsInBrief-img.png';
import videoImg from '@/assets/img/video-img.png';
import groupChatImg from '@/assets/img/groupChat-img.png';
import PostList from '@/components/PostList';

export type Props = {};

const DaoList: React.FC<Props> = (props) => {
  const params: { daoId?: string } = useParams();
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';
  const bgImg =
    'https://img.js.design/assets/img/63fda924b045c20466fc7a43.jpeg#d9b517fc27cf3e514de98ce387eadd7d';
  const url = useUrl();
  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const [daoId, setDaoId] = useState(params.daoId || userInfo?.id);
  const [daoInfo, setDaoInfo] = useState<DaoInfo>();

  const getDaoInfo = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.getById(url, daoId);
    setDaoInfo(data.data);
  };
  const getBookmarkList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list.length) {
      setBookmarkList(data.data.list);
      if (!daoId) setDaoId(data.data.list[0].id);
    }
  };

  const bookmarkHandle = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.bookmark(url, daoId);
    setIsBookmark(data.data.status);
  };

  const checkBookmark = async () => {
    if (!daoId) return;
    const { data } = await DaoApi.checkBookmark(url, daoId);
    setIsBookmark(data.data.status);
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  useEffect(() => {
    checkBookmark();
    getDaoInfo();
  }, [daoId]);

  return (
    <>
      <div className={styles.content}>
        <MyAttention
          user={userInfo}
          joinedList={bookmarkList}
          setDaoId={setDaoId}
          daoId={daoId}
        />
        {daoId ? (
          <>
            <CommunityCard
              status={isBookmark}
              handle={bookmarkHandle}
              daoInfo={daoInfo}
              bgImg={bgImg}
            />
            <div className={styles.jumpBlock}>
              <JumpIconButton imgUrl={newsInBriefImg} title={'Newsletter'} />
              <JumpIconButton imgUrl={videoImg} title={'Video'} />
              <JumpIconButton imgUrl={groupChatImg} title={'Chat'} />
            </div>
            <div className={styles.underLine}></div>
            <PostList daoId={daoId} />
          </>
        ) : (
          <div className={styles.createPage}>
            <div className={styles.createCommunityCard}>
              <div className={styles.createCommunity}>
                <div className={styles.block}>
                  <p className={styles.title}>create community</p>
                  <div
                    className={styles.button}
                    onClick={() => {
                      history.push('/createCommunity');
                    }}
                  >
                    <img src={addImg} className={styles.addImg} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.noCreateBackGround}></div>
            <p className={styles.noCreateText}>
              Nothing. Go create or join a community!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DaoList;
