import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import GraphicMessage from '@/components/GraphicMessage';
import LongVideo from '@/components/LongVideo';
import reTransFerIcon from '@/assets/icon/reTransFerIcon.svg';
import { history } from '@@/core/history';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
};

const ReTransfer: React.FC<Props> = (props) => {
  const { post, refreshPage, delPost } = props;
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];

  const handleClick = () => {
    history.push(`/daoCommunity/${post?.dao.id}`);
  };

  return (
    <div className={styles.reTransfer}>
      <div className={styles.trans} onClick={handleClick}>
        <img src={reTransFerIcon} alt="" className={styles.imgSvg} />
        <span className={styles.dao}>{post?.dao.name}</span>
        <span className={styles.text}>retransfer this</span>
      </div>
      {post.orig_type === 0 ? (
        <GraphicMessage
          post={post}
          refreshPage={refreshPage}
          delPost={delPost}
          // isReTransfer={true}
        />
      ) : post.orig_type === 1 ? (
        <LongVideo
          post={post}
          refreshPage={refreshPage}
          delPost={delPost}
          // isReTransfer={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReTransfer;
