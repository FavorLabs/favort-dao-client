import * as React from 'react';
import styles from './index.less';

export type Props = {
  imgUrl?: string;
  title?: string;
  address?: string;
};

const JumpIconButton: React.FC<Props> = (props) => {
  const { imgUrl, title, address } = props;

  return (
    <>
      <div className={styles.jumpContent}>
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="" className={styles.img} />
        </div>
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
};

export default JumpIconButton;
