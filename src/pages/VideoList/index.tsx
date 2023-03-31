import * as React from 'react';
import styles from './index.less';
import LongVideo from '@/components/LongVideo';
import { useSelector } from 'umi';
import { useState } from 'react';
import { Models } from '@/declare/modelType';
import PostList from '@/components/PostList';
import TopNavBar from '@/components/TopNavBar';

type Props = {
  match: {
    params: {
      daoId: string;
    };
  };
};

const VideoList: React.FC<Props> = (props) => {
  const { daoId } = props.match.params;
  const [vSrc, setVSrc] = useState('');
  const { api } = useSelector((state: Models) => state.global);
  return (
    <div className={styles.content}>
      <TopNavBar title={'Videos'} right={null} />

      <div className={styles.list}>
        <div>
          {/*<video*/}
          {/*  controls*/}
          {/*  autoPlay={false}*/}
          {/*  playsInline*/}
          {/*  key={vSrc}*/}
          {/*  style={{*/}
          {/*    width: '100%',*/}
          {/*    height: '100%',*/}
          {/*    maxHeight: '500px',*/}
          {/*    borderRadius: '4px',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <source src={api + '/file/' + vSrc} type={'video/mp4'} />*/}
          {/*</video>*/}
        </div>

        <PostList type={1} daoId={daoId} />
      </div>
    </div>
  );
};

export default VideoList;
