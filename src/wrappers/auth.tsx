import React from 'react';
import { checkLogin } from '@/utils/util';
import LogoutDialog from '@/components/LogoutDialog';

export default (props: React.PropsWithChildren<any>) => {
  if (checkLogin()) {
    return <div>{props.children}</div>;
  } else {
    return <LogoutDialog visible={true} />;
  }
};
