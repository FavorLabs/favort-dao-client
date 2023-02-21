import React, { useMemo } from 'react';
import styles from './index.less';
import NSkeleton from './NSkeleton';
import VSkeleton from './VSkeleton';
import children from '@/components/ThreeStageLayout/Children';

export type Props = {
  type?: 0 | 1;
  loading: boolean;
};
const Index: React.FC<Props> = (props) => {
  const { type = 0, loading } = props;

  const s = useMemo(() => {
    if (type === 0) return <NSkeleton />;
    if (type === 1) return <VSkeleton />;
  }, [type]);

  return <>{loading ? s : props.children}</>;
};

export default Index;
