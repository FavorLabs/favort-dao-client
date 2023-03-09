import * as React from 'react';
import styles from './index.less';
import { useUrl } from '@/utils/hooks';
import PostList from '@/components/PostList';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  const url = useUrl();
  return (
    <>
      <PostList />
    </>
  );
};

export default Recommend;
