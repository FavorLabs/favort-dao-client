import * as React from 'react';
import styles from './index.less';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import PostList from '@/components/PostList';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  useActivate(() => {
    // console.log('recommend activate');
  });

  useUnactivate(() => {
    // console.log('recommend unActivate');
  });

  return (
    <div className={styles.recommend}>
      <PostList type={'post'} />
    </div>
  );
};

export default () => {
  return (
    // @ts-ignore
    <KeepAlive when={true} saveScrollPosition={'screen'}>
      <Recommend />
    </KeepAlive>
  );
};
