import * as React from 'react';
import styles from './index.less';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import PostList from '@/components/PostList';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  const { scrollPosition } = useSelector((state: Models) => state.manage);
  const childrenDOM = document.querySelector('#TSL_children') as Element;

  useActivate(() => {
    childrenDOM.scrollTo(0, scrollPosition.recommend);
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
