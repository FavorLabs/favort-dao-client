import * as React from 'react';
import PostList from '@/components/PostList';
import styles from './index.less';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';

  const videoUrl =
    'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca';

  return (
    <div className={styles.page}>
      <PostList focus />
    </div>
  );
};

export default Follow;
