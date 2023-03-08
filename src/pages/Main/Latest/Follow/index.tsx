import * as React from 'react';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { usePath, useResourceUrl, useUrl } from '@/utils/hooks';
import PostList from '@/components/PostList';
import postApi from '@/services/tube/PostApi';

export type Props = {};
const Follow: React.FC<Props> = (props) => {
  const url = useUrl();
  const handleClick = () => {
    console.log(1);
  };
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';

  const videoUrl =
    'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca';

  return (
    <>
      <PostList />
    </>
  );
};

export default Follow;
