import * as React from 'react';
import { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
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
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';
  const bgImg =
    'https://img.js.design/assets/img/63fda924b045c20466fc7a43.jpeg#d9b517fc27cf3e514de98ce387eadd7d';
  const url = useUrl();
  // const resourceUrl = useResourceUrl();
  const [value, setValue] = useState('');
  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const { userInfo } = useSelector((state: Models) => state.dao);

  const getBookmarkList = async () => {
    const { data } = await DaoApi.getBookmarkList(url);
    if (data.data.list) setBookmarkList(data.data.list);
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  const { run } = useDebounceFn(async (value: string) => {
    if (!value) return setOptions([]);
    const { data } = await DaoApi.queryDao(url, value);
    const res = data.data.list?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setOptions(res || []);
  });

  return (
    <>
      <div className={styles.content}>
        {userInfo ? (
          <>
            <MyAttention userImg={userImg} />
            <CommunityCard bgImg={bgImg} />
            <div className={styles.jumpBlock}>
              <JumpIconButton imgUrl={newsInBriefImg} title={'message'} />
              <JumpIconButton imgUrl={videoImg} title={'video'} />
              <JumpIconButton imgUrl={groupChatImg} title={'chat'} />
            </div>
            <div className={styles.underLine}></div>
            <PostList />
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
              什么都没有，快去创建或加入社区吧
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DaoList;
