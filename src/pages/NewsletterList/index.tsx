import * as React from 'react';
import styles from './index.less';
import GraphicMessage from '@/components/GraphicMessage';
import { NavBar } from 'antd-mobile';
import { useHistory, useSelector } from 'umi';
import PostList from '@/components/PostList';
import { Models } from '@/declare/modelType';

export type Props = {};

const NewsletterList: React.FC<Props> = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state: Models) => state.dao);
  console.log(userInfo, 'xinx');
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';

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

      <PostList type={0} />
    </div>
  );
};

export default NewsletterList;
