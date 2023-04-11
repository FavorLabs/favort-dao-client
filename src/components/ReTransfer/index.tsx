import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import GraphicMessage from '@/components/GraphicMessage';
import LongVideo from '@/components/LongVideo';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
};

const ReTransfer: React.FC<Props> = (props) => {
  const { post, refreshPage, delPost } = props;
  return (
    <div className={styles.reTransfer}>
      {post.orig_type === 0 ? (
        <GraphicMessage
          post={post}
          refreshPage={refreshPage}
          delPost={delPost}
          isReTransfer={true}
        />
      ) : post.orig_type === 1 ? (
        <LongVideo
          post={post}
          refreshPage={refreshPage}
          delPost={delPost}
          isReTransfer={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReTransfer;
