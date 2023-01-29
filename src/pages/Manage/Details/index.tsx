import * as React from 'react';
import styles from './index.less';

export type Props = {};
const Details: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.content}>Details</div>
    </>
  );
};

export default Details;
