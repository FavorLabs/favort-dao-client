import * as React from 'react';
import styles from './index.less';

export type Props = {};
const Videos: React.FC<Props> = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};

export default Videos;
