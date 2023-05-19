import * as React from 'react';
import styles from './index.less';
import CommunityInfo from '@/components/CommunityInfo';
import { PostInfo } from '@/declare/tubeApiType';
import { checkLogin, getContent } from '@/utils/util';
import { history, useHistory, useSelector } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';
import { Models } from '@/declare/modelType';
import { useUrl } from '@/utils/hooks';
import NewsDetailBlock from '@/components/NewsDetailBlock';

export type Props = {
  post: PostInfo;
};

const QuoteBlock: React.FC<Props> = (props) => {
  const { author_dao, dao, created_on, origCreatedAt } = props.post;

  if (!dao) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <div className={styles.top}>
          <div className={styles.left}>
            <CommunityInfo daoInfo={author_dao} createTime={origCreatedAt} />
          </div>
        </div>
        <NewsDetailBlock post={props.post} isReTransfer={true} />
      </div>
    </div>
  );
};

export default QuoteBlock;
