import * as React from 'react';
import styles from './index.less';
import PostList from '@/components/PostList';
import TopNavBar from '@/components/TopNavBar';
import { useIntl } from '@@/plugin-locale/localeExports';

type Props = {
  match: {
    params: {
      daoId: string;
    };
  };
};

const NewsletterList: React.FC<Props> = (props) => {
  const { daoId } = props.match.params;
  const intl = useIntl();
  return (
    <div className={styles.content}>
      <TopNavBar
        title={`${intl.formatMessage({
          id: 'newsLetterList.navBar.title',
        })}`}
        right={null}
      />

      <div className={styles.list}>
        <PostList type={0} daoId={daoId} />
      </div>
    </div>
  );
};

export default NewsletterList;
