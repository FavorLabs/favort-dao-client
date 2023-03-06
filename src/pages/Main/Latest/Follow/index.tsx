import * as React from 'react';
import styles from './index.less';
import GraphicMessage from '@/components/GraphicMessage';
import MyAttention from '@/components/MyAttention';
import CommunityCard from '@/components/CommunityCard';
import CommunityIntro from '@/components/CommunityIntro';
import LongVideo from '@/components/LongVideo';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  const handleClick = () => {
    console.log(1);
  };
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';
  const bgImg =
    'https://img.js.design/assets/img/63fda924b045c20466fc7a43.jpeg#d9b517fc27cf3e514de98ce387eadd7d';
  return (
    <>
      <MyAttention userImg={userImg} />
      <CommunityCard bgImg={bgImg} />
      <GraphicMessage
        userImg={userImg}
        watchNum={123}
        commentOnNum={123}
        likeNum={123}
      />
      <CommunityIntro
        title={'FavorDao'}
        text={'x x x x'}
        operate={'focus on'}
        handleClick={handleClick}
      />
      <LongVideo
        title={'title'}
        community={'FavorDao'}
        time={'08:00'}
        content={'x x x'}
        watchNum={123}
        commentNum={123}
        starNum={123}
      />
    </>
  );
};

export default Follow;
