import React from 'react';
import { useVerifyChannel } from '@/utils/hooks';

export default (props: React.PropsWithChildren<any>) => {
  const verifyChannel = useVerifyChannel();
  if (verifyChannel) {
    return <div>{props.children}</div>;
  } else {
    return <>{props.history.goBack(-1)}</>;
  }
};
