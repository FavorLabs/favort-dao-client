import * as React from 'react';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import PostList from '@/components/PostList';
import styles from './index.less';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  const { scrollPosition } = useSelector((state: Models) => state.manage);
  const childrenDOM = document.querySelector('#TSL_children') as Element;

  useActivate(() => {
    childrenDOM.scrollTo(0, scrollPosition.joined);
  });

  useUnactivate(() => {
    // console.log('recommend unActivate');
  });

  return (
    <div className={styles.page}>
      <PostList focus type={'post'} />
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
