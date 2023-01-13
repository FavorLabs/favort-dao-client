import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.less';

export type Props = {
  text: string;
  status: boolean;
};

const Loading: React.FC<Props> = (props) => {
  return (
    <div className={styles.layer}>
      <Spin
        style={{
          color: 'inherit',
          transform: `translateY(${props.text ? '0px' : '-50px'})`,
        }}
        spinning={props.status}
        delay={500}
        size="large"
        indicator={<LoadingOutlined />}
        tip={props.text || 'loading page'}
      />
    </div>
  );
};
export default Loading;
