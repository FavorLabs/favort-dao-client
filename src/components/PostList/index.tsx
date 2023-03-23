import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Page, PostInfo } from '@/declare/tubeApiType';
import GraphicMessage from '@/components/GraphicMessage';
import LongVideo from '@/components/LongVideo';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { message } from 'antd';
import { DotLoading, InfiniteScroll, PullToRefresh } from 'antd-mobile';
import CommunityIntro from '@/components/CommunityIntro';
import ErrorOccurred from '@/components/ErrorOccurred';
import { useSelector, history } from 'umi';
import { Models } from '@/declare/modelType';
import { isMobile, sleep, eventEmitter } from '@/utils/util';
import _ from 'lodash';

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
  const [errored, setErrored] = useState<boolean>(false);

  const pathname = history.location.pathname;

  const loadMore = async () => {
    try {
      const request = focus
        ? (params: Page) => PostApi.getFollow(url, params)
        : daoId
        ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
        : (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      setErrored(false);
      setList((list) => [...list, ...data.data.list]);
      setHasMore(
        data.data.pager.total_rows > pageData.page * pageData.page_size,
      );
      setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setErrored(true);
    }
  };

  const refreshPage = async () => {
    try {
      const pageInfo = { page: 1, page_size: 10, type, query };
      const request = focus
        ? (params: Page) => PostApi.getFollow(url, params)
        : daoId
        ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
        : (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageInfo);
      setErrored(false);
      setList((list) => data.data.list);
      setPageData((pageData) => ({ ...pageData, page: 1 }));
      setHasMore(data.data.pager.total_rows > pageData.page_size);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setErrored(true);
    }
  };

  const refresh = async () => {
    await sleep(2000);
    await refreshPage();
    setPageData({
      page: 2,
      page_size: 10,
      type,
      query,
    });
  };

  const delPost = async (postId: string) => {
    const delList = _.filter(list, (v) => v.id !== (postId as string));
    setList((list) => delList);
  };

  useEffect(() => {
    if (!hasMore) {
      refreshPage();
    }
  }, [query]);

  useEffect(() => {
    if (pathname === '/latest/follow') {
      eventEmitter.removeListener('menuRefreshFollow');
      eventEmitter.on('menuRefreshFollow', refreshPage);
    } else if (pathname === '/latest/recommend') {
      eventEmitter.removeListener('menuRefreshRecommend');
      eventEmitter.on('menuRefreshRecommend', refreshPage);
    }
  }, []);

  return (
    <>
      {errored ? (
        <ErrorOccurred retryFn={refreshPage} />
      ) : (
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
                <GraphicMessage
                  post={item}
                  refreshPage={refreshPage}
                  delPost={delPost}
                />
              ) : item.type === 1 ? (
                <LongVideo
                  post={item}
                  refreshPage={refreshPage}
                  delPost={delPost}
                />
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
      )}
    </>
  );
};

export default PostList;
