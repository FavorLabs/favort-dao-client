import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory, useSelector } from 'umi';
import PostList from '@/components/PostList';

type Props = {
  match: {
    params: {
      daoId: string;
    };
  };
};

const NewsletterList: React.FC<Props> = (props) => {
  const history = useHistory();
  const { daoId } = props.match.params;
  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Newsletter
      </NavBar>

      <div className={styles.list}>
        <PostList type={0} daoId={daoId} />
      </div>
    </div>
  );
};

export default NewsletterList;
