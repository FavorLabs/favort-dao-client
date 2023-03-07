import React, { useState } from 'react';
// import styles from "./index.less";
import { Page, PostInfo } from '@/declare/tubeApiType';
import GraphicMessage from '@/components/GraphicMessage';
import LongVideo from '@/components/LongVideo';
import CommunityIntro from '@/components/CommunityIntro';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { DotLoading, InfiniteScroll, List } from 'antd-mobile';

export type Props = {
  type?: number;
  address?: string;
};
const Index: React.FC<Props> = (props) => {
  const url = useUrl();
  const { type, address } = props;
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 10,
    type,
  });
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<PostInfo[]>([]);

  const loadMore = async () => {
    const request = address
      ? (params: Page) => PostApi.getPostListByAddress(url, address, params)
      : (params: Page) => PostApi.getPostListByType(url, params);
    const { data } = await request(pageData);
    setList((list) => [...list, ...data.data.list]);
    setPageData((pageData) => ({ ...pageData, page: pageData.page++ }));
    setHasMore(data.data.pager.total_rows > pageData.page * pageData.page_size);
  };

  return (
    <>
      {list.map((item) => (
        <div key={item.id}>
          {item.type === 0 ? (
            <CommunityIntro post={item} />
          ) : item.type === 1 ? (
            <GraphicMessage post={item} />
          ) : item.type === 2 ? (
            <LongVideo post={item} />
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
    </>
  );
};

export default Index;
