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
import { useHistory } from 'umi';
import { isMobile, sleep, eventEmitter } from '@/utils/util';
import _ from 'lodash';
import DetailSkeleton from '@/components/CustomSkeleton/PostSkeleton/DetailSkeleton';
import { Option } from '@/components/CommentArea';
import { useIntl } from '@@/plugin-locale/localeExports';
import ReTransfer from '@/components/ReTransfer';
import QuoteNews from '@/components/QuoteNews';

export type Props = {
  type?: number | string;
  daoId?: string;
  focus?: boolean;
  query?: string;
};

const PostList: React.FC<Props> = (props) => {
  const url = useUrl();
  const history = useHistory();
  const pathname = history.location.pathname;
  const intl = useIntl();
  const { type, daoId, focus = false, query } = props;
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 5,
    type,
    query,
  });
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<PostInfo[]>([]);
  const [errored, setErrored] = useState<boolean>(false);
  const [isOnePage, setIsOnePage] = useState<boolean>(true);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);

  const loadMore = async () => {
    try {
      const request = focus
        ? (params: Page) => PostApi.getFollow(url, params)
        : daoId
        ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
        : (params: Page) => PostApi.getPostListByType(url, params);
      if (isOnePage && pathname === '/latest/recommend') {
        // @ts-ignore
        const oneListArr = JSON.parse(localStorage.getItem('postListArr'));
        if (oneListArr) {
          setList(oneListArr);
          setHasMore(true);
          setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
        } else {
          const { data } = await request(pageData);
          localStorage.setItem('postListArr', JSON.stringify(data.data.list));
          const listArr: PostInfo[] = data.data.list;
          setList((list) => [...list, ...listArr]);
          setHasMore(
            data.data.pager.total_rows > pageData.page * pageData.page_size,
          );
          setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
        }
      } else {
        const { data } = await request(pageData);
        const listArr: PostInfo[] = data.data.list;
        setList((list) => [...list, ...listArr]);
        setHasMore(
          data.data.pager.total_rows > pageData.page * pageData.page_size,
        );
        setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
      }
      setErrored(false);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setErrored(true);
    }
  };

  const refreshPage = async () => {
    try {
      const pageInfo = { page: 1, page_size: 5, type, query };
      const request = focus
        ? (params: Page) => PostApi.getFollow(url, params)
        : daoId
        ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
        : (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageInfo);
      localStorage.setItem('postListArr', JSON.stringify(data.data.list));
      setErrored(false);
      const listArr: PostInfo[] = data.data.list;
      setList((list) => [...listArr]);
      setPageData((pageData) => ({ ...pageData, page: 2 }));
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
      page_size: 5,
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
    // @ts-ignore
    const oneListArr = JSON.parse(localStorage.getItem('postListArr'));
    if (pageData.page !== 1) {
      setIsOnePage(false);
      setIsSkeleton(false);
    }
    if (oneListArr) {
      setIsSkeleton(false);
    }
  }, [pageData.page]);

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
          canReleaseText={`${intl.formatMessage({
            id: 'postList.pullToRefresh.canReleaseText',
          })}`}
          completeText={`${intl.formatMessage({
            id: 'postList.pullToRefresh.completeText',
          })}`}
          refreshingText={`${intl.formatMessage({
            id: 'postList.pullToRefresh.refreshingText',
          })}`}
          pullingText={`${intl.formatMessage({
            id: 'postList.pullToRefresh.pullingText',
          })}`}
          onRefresh={refresh}
          disabled={!isMobile()}
        >
          {list.map((item) => (
            <div
              key={item.id}
              className={`${item.type !== -1 ? styles.postItem : ''}`}
            >
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
              ) : item.type === 2 ? (
                // <ReTransfer
                //   post={item}
                //   refreshPage={refreshPage}
                //   delPost={delPost}
                // />
                <GraphicMessage
                  post={item}
                  refreshPage={refreshPage}
                  delPost={delPost}
                />
              ) : item.type === 3 ? (
                // <QuoteNews
                //   post={item}
                //   refreshPage={refreshPage}
                //   delPost={delPost}
                // />
                <GraphicMessage
                  post={item}
                  refreshPage={refreshPage}
                  delPost={delPost}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <>
              {hasMore ? (
                <div className={styles.loading}>
                  {isSkeleton && (
                    <>
                      <DetailSkeleton />
                      <DetailSkeleton />
                    </>
                  )}
                </div>
              ) : (
                <span>
                  {intl.formatMessage({
                    id: 'postList.infiniteScroll.bottom',
                  })}
                  {/*Already at the bottom*/}
                </span>
              )}
            </>
          </InfiniteScroll>
        </PullToRefresh>
      )}
    </>
  );
};

export default PostList;
