import React from 'react';
import styles from './index.less';
import SVGInject from '@iconfu/svg-inject';

export type Props = {
  svg: string;
  clickFn?: () => void;
};

const SvgIcon: React.FC<Props> = (props) => {
  return (
    <>
      <div
        className={styles['svg-icon']}
        onClick={() => {
          props.clickFn ? props.clickFn() : false;
        }}
      >
        <img
          src={props.svg}
          alt=""
          onLoad={(e) => {
            SVGInject(e.target);
          }}
        />
      </div>
    </>
  );
};

export default SvgIcon;
