import * as React from 'react';
import styles from './index.less';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import PostList from '@/components/PostList';
import { useEffect } from 'react';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  useActivate(() => {
    // console.log('recommend activate');
  });

  useUnactivate(() => {
    // console.log('recommend unActivate');
  });

  // useEffect(() => {
  //   window.addEventListener('scroll', (e) => {
  //     e = e || window.event;
  //     if (e.wheelDelta) {
  //       //
  //     }
  //   });
  // }, []);

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
