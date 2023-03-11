import * as React from 'react';
import styles from './index.less';
import lookOver from '@/assets/img/look_over.png';
import commentOn from '@/assets/img/comment_on.png';
import support from '@/assets/img/support.png';
import supportOn from '@/assets/img/support_on.png';

export type Props = {
  watchNum?: number;
  commentOnNum?: number;
  likeNum?: number;
  likeStatus?: boolean;
  likeHandle?: () => void;
};

const CommentArea: React.FC<Props> = (props) => {
  const { watchNum, commentOnNum, likeNum, likeStatus, likeHandle } = props;
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
        <div
          className={styles.operateDiv}
          onClick={() => {
            likeHandle?.();
          }}
        >
          {likeStatus ? (
            <img src={supportOn} className={styles.operateIcon} alt={'like'} />
          ) : (
            <img src={support} className={styles.operateIcon} alt={'liked'} />
          )}
          <span className={styles.operateText}>{likeNum}</span>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
