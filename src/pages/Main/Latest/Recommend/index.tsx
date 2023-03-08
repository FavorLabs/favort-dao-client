import * as React from 'react';
import styles from './index.less';
import { useUrl } from '@/utils/hooks';
import PostApi from '@/services/tube/PostApi';
import { useEffect, useState } from 'react';

export type Props = {};
const Recommend: React.FC<Props> = (props) => {
  const url = useUrl();
  console.log(url, 'Access address');
  const getData = async () => {
    const request = PostApi.getRecommend(url);
    console.log(request, 'Follow list');
  };

  useEffect(() => {
    getData();
  });
  return <>Recommend</>;
};

export default Recommend;
