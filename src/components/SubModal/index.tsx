import * as React from 'react';
import { Col, Modal, Radio, Row, Space } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import Uniswap from '@/components/Uniswap';

export type Props = {
  open: boolean;
};
const SubModal: React.FC<Props> = (props) => {
  const { open } = props;
  const [value, setValue] = useState(1);

  return (
    <>
      <Modal title="Title" open={open} centered destroyOnClose width={700}>
        <div>
          <p>
            <span className={styles.key}>Channel Account:</span>&nbsp;
            <span className={styles.value}>{0x123}</span>
          </p>
          <p>
            <span className={styles.key}>Your Account:</span>&nbsp;
            <span className={styles.value}>{0x123}</span>
          </p>
          <p>
            <span style={{ marginRight: 20 }}>
              <span className={styles.key}>Your MATIC:</span>&nbsp;
              <span className={styles.value}>{1}</span>
            </span>
            <span style={{ marginRight: 20 }}>
              <span className={styles.key}>Pay:</span>&nbsp;
              <span className={styles.value}>{1}</span>
            </span>
            <span style={{ marginRight: 20 }}>
              <span className={styles.key}>Remain:</span>&nbsp;
              <span className={styles.value}>{1}</span>
            </span>
          </p>
        </div>
        <Row className={styles.sub}>
          <Col span={24} md={8} className={styles.left}>
            <Radio.Group
              onChange={(e) => setValue(e.target.value)}
              value={value}
            >
              <Space direction="vertical">
                <Radio value={1}>Token</Radio>
                <Radio value={2}>Uniswap</Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col span={24} md={15} className={styles.right}>
            {(value === 1 && (
              <>
                Your assets:
                <p>FTUBE: {1}</p>
              </>
            )) ||
              (value === 2 && (
                <>
                  {/*  <Uniswap*/}
                  {/*    provider={}*/}
                  {/*    chainId={}*/}
                  {/*    favorTokenAddress={}*/}
                  {/*    favorTubeAddress={}*/}
                  {/*    decimal={}*/}
                  {/*    name={}*/}
                  {/*    symbol={}*/}
                  {/*    price={}*/}
                </>
              ))}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SubModal;
