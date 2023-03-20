import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Page, PostInfo } from '@/declare/tubeApiType';
import GraphicMessage from '@/components/GraphicMessage';
import LongVideo from '@/components/LongVideo';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { DotLoading, InfiniteScroll, PullToRefresh } from 'antd-mobile';
import CommunityIntro from '@/components/CommunityIntro';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { isMobile, sleep } from '@/utils/util';

export type Props = {
  type?: number;
  daoId?: string;
  focus?: boolean;
  query?: string;
};
const PostList: React.FC<Props> = (props) => {
  const url = useUrl();
  const { type, daoId, focus = false, query } = props;
  const { refreshPostList } = useSelector((state: Models) => state.manage);
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 10,
    type,
    query,
  });
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<PostInfo[]>([]);

  const loadMore = async () => {
    const request = focus
      ? (params: Page) => PostApi.getFollow(url, params)
      : daoId
      ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
      : (params: Page) => PostApi.getPostListByType(url, params);
    const { data } = await request(pageData);
    setList((list) => [...list, ...data.data.list]);
    setHasMore(data.data.pager.total_rows > pageData.page * pageData.page_size);
    setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
  };

  const refreshPage = async () => {
    const pageInfo = { page: 1, page_size: 10, type, query };
    const request = focus
      ? (params: Page) => PostApi.getFollow(url, params)
      : daoId
      ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
      : (params: Page) => PostApi.getPostListByType(url, params);
    const { data } = await request(pageInfo);
    setList((list) => data.data.list);
    setPageData((pageData) => ({ ...pageData, page: 1 }));
    setHasMore(data.data.pager.total_rows > pageData.page_size);
  };

  const refresh = async () => {
    await sleep(2000);
    await refreshPage();
  };

  useEffect(() => {
    if (!hasMore) {
      refreshPage();
    }
  }, [query]);

  return (
    <>
      <PullToRefresh
        canReleaseText={'Release to refresh immediately'}
        completeText={'Refresh successful'}
        refreshingText={'Loading ......'}
        pullingText={'Pull down to refresh'}
        onRefresh={refresh}
        disabled={!isMobile()}
      >
        {list.map((item) => (
          <div key={item.id} className={styles.postItem}>
            {item.type === 0 ? (
              <GraphicMessage post={item} refreshPage={refreshPage} />
            ) : item.type === 1 ? (
              <LongVideo post={item} refreshPage={refreshPage} />
            ) : item.type === -1 ? (
              <CommunityIntro post={item} />
            ) : (
              <></>
            )}
          </div>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          <>
            {hasMore ? (
              <>
                <span>Loading</span>
                <DotLoading />
              </>
            ) : (
              <span>Already at the bottom</span>
            )}
          </>
        </InfiniteScroll>
      </PullToRefresh>
    </>
  );
};

export default PostList;
