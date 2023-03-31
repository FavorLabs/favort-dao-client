import React from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { colorArr } from '@/components/ChunkSourceInfoPopup';

export type Props = {
  chunk: number[];
};
const ChunkTooltip: React.FC<Props> = (props) => {
  const chunkArr: number[] = props.chunk;
  return (
    <ul className={styles.chunkTooltip}>
      {chunkArr.map((item, index) => {
        return (
          <li
            key={index}
            className={classNames({
              [styles.square]: true,
            })}
            style={{ backgroundColor: colorArr[item] }}
          />
        );
      })}
    </ul>
  );
};

export default ChunkTooltip;
