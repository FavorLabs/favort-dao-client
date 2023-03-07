import * as React from 'react';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { usePath, useResourceUrl, useUrl } from '@/utils/hooks';
import GraphicMessage from '@/components/GraphicMessage';
import CommunityIntro from '@/components/CommunityIntro';
import LongVideo from '@/components/LongVideo';
import postApi from '@/services/tube/PostApi';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  const url = useUrl();
  const handleClick = () => {
    console.log(1);
  };
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';
  const communityImg =
    'https://img.js.design/assets/img/63fefe8294031f9157a56c7f.jpeg#42063ac892a1dcf6c98fbfb51a463cd2';
  const communityBackgroundImg =
    'https://img.js.design/assets/img/63fda924b045c20466fc7a43.jpeg#d9b517fc27cf3e514de98ce387eadd7d';
  const videoUrl =
    'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca';

  const getListInfo = async () => {
    const { data } = await postApi.getPostListByType(url, {
      page: 1,
      page_size: 10,
    });
    console.log(data, '打印数据');
  };

  useEffect(() => {
    getListInfo();
  });

  return (
    <>
      <GraphicMessage
        userImg={userImg}
        watchNum={123}
        commentOnNum={123}
        likeNum={123}
      />
      <CommunityIntro
        title={'FavorDao'}
        text={
          'community profile: hello my name is tom, this is my dao,if you need my help'
        }
        operate={'focus on'}
        handleClick={handleClick}
        communityImg={communityImg}
        communityBackgroundImg={communityBackgroundImg}
      />
      <LongVideo
        title={'video title'}
        community={'FavorDao'}
        time={'08:00'}
        content={
          'video introduction: hello, my name is tom, what is your name? '
        }
        videoTime={'16:05'}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default Follow;
