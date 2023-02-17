import * as React from 'react';
import { Col, message, Modal, Radio, Row, Space, Spin } from 'antd';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useState, useMemo, useEffect } from 'react';
import Uniswap from '@/components/Uniswap';
import { useSelector } from 'umi';
import Web3 from 'web3';
import { Models } from '@/declare/modelType';
import { configs, Config, favorTubeAbi, tokenAbi } from '@/config/config';

export type Props = {
  open: boolean;
  closeModal: () => void;
};
const SubModal: React.FC<Props> = (props) => {
  const { open } = props;

  const [value, setValue] = useState<number>(1);
  const [chainInfo, setChainInfo] = useState<Config>(configs[19]);
  const [preDataLoading, setPreDataLoading] = useState<boolean>(false);
  const [chainCoinBal, setChainCoinBal] = useState<number>(0);
  const [chainCoinBalLoading, setChainCoinBalLoading] =
    useState<boolean>(false);
  const [subPrice, setSubPrice] = useState<number>(0);

  const {
    channelInfo,
    nodeWeb3,
    address,
    favorTubeContract,
    tokenTubeContract,
  } = useSelector((state: Models) => state.global);

  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const getPreData = async () => {
    setPreDataLoading(true);
    const preDataTimer = setTimeout(() => {
      message.info('Chain query failure');
      // props.closeModal();
    }, 1000 * 15);
    try {
      await getChainCoinBalance();
      console.log('contract', favorTubeContract, tokenTubeContract);
      // setSubPrice();
    } catch (e) {
      //
    }
  };

  const getChainCoinBalance = async () => {
    try {
      setChainCoinBalLoading(true);
      const balance = await nodeWeb3?.eth.getBalance(address);
      console.log('balance', balance);
      setChainCoinBal(
        Number(nodeWeb3?.utils.fromWei(balance as string, 'ether')),
      );
      setChainCoinBalLoading(false);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  // const payDisable = useMemo(() => {}, []);

  useEffect(() => {
    if (nodeWeb3) {
      getPreData();
    }
  }, [nodeWeb3]);

  return (
    <>
      <Modal
        title={'Subscribe ' + channelInfo?.name}
        open={open}
        centered
        destroyOnClose
        maskClosable={false}
        width={700}
        okText="Pay"
        okButtonProps={{
          disabled: true,
          loading: true,
        }}
        onCancel={() => {
          props.closeModal();
        }}
      >
        <div className={styles.content}>
          <div className={styles.preData}>
            <p>
              <span className={styles.key}>Channel Account:</span>&nbsp;
              <span className={styles.value}>{channelInfo?.address}</span>
            </p>
            <p>
              <span className={styles.key}>Your Account:</span>&nbsp;
              <span className={styles.value}>{address}</span>
            </p>
            <p className={styles.lastP}>
              <span style={{ marginRight: 20, display: 'flex' }}>
                <span className={styles.key}>Your {chainInfo.tokenName}:</span>
                &nbsp;
                {chainCoinBalLoading ? (
                  <Spin indicator={loadIcon} size="small" />
                ) : (
                  <span className={styles.balanceFaucet}>
                    <span
                      className={styles.value}
                      style={{ marginRight: '6px' }}
                    >
                      {chainCoinBal}
                    </span>
                    {chainInfo?.faucet ? (
                      <a
                        href={chainInfo?.faucet}
                        target="_blank"
                        style={{ marginRight: '6px' }}
                      >
                        Faucet
                      </a>
                    ) : (
                      <></>
                    )}
                    <SyncOutlined
                      className={styles.refresh}
                      onClick={getChainCoinBalance}
                    />
                  </span>
                )}
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
                    {/*<Uniswap*/}
                    {/*  provider={}*/}
                    {/*  chainId={}*/}
                    {/*  favorTokenAddress={}*/}
                    {/*  favorTubeAddress={}*/}
                    {/*  decimal={}*/}
                    {/*  name={}*/}
                    {/*  symbol={}*/}
                    {/*  price={}*/}
                    {/*/>*/}
                  </>
                ))}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default SubModal;
