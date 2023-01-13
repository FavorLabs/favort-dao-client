// @flow
import { Models } from '@/declare/modelType';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';

const Layout: React.FC = (props) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

export default Layout;
