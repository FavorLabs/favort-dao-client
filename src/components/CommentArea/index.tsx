import * as React from 'react';
import styles from './index.less';
import lookOver from '@/assets/img/look_over.png';
import commentOn from '@/assets/img/comment_on.png';
import support from '@/assets/img/support.png';

export type Props = {
  watchNum?: number;
  commentOnNum?: number;
  likeNum?: number;
};

const CommentArea: React.FC<Props> = (props) => {
  const { watchNum, commentOnNum, likeNum } = props;
  return (
    <>
      <div className={styles.operate}>
        <div className={styles.operateDiv}>
          <img src={lookOver} className={styles.operateIcon} />
          <span className={styles.operateText}>{watchNum}</span>
        </div>
        <div className={styles.operateDiv}>
          <img src={commentOn} className={styles.operateIcon} />
          <span className={styles.operateText}>{commentOnNum}</span>
        </div>
        <div className={styles.operateDiv}>
          <img src={support} className={styles.operateIcon} />
          <span className={styles.operateText}>{likeNum}</span>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
