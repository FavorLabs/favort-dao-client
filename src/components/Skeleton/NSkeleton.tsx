import React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd';

export type Props = {
  count?: number;
};
const Index: React.FC<Props> = (props) => {
  const { count = 3 } = props;
  return (
    <>
      <Skeleton active avatar paragraph={{ rows: count }} />
    </>
  );
};

export default Index;
