import * as React from 'react';
import KeepAlive from 'react-activation';
import PostList from '@/components/PostList';
import styles from './index.less';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  return (
    <div className={styles.page}>
      <PostList focus name={'Follow'} />
    </div>
  );
};

export default () => {
  return (
    // @ts-ignore
    <KeepAlive when={true} saveScrollPosition={'screen'}>
      <Follow />
    </KeepAlive>
  );
};
