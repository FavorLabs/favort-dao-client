import * as React from 'react';
import styles from './index.less';
import { ReactNode } from 'react';
import { useHistory } from 'umi';

export type Props = {
  content: ReactNode;
};
const Children: React.FC<Props> = (props) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  return (
    <div
      className={`${styles.content} ${
        route === 'daoCommunity'
          ? styles.dao
          : route === 'chat' || route === 'mine'
          ? styles.chat
          : ''
      }`}
    >
      {props.content}
    </div>
  );
};

export default Children;
