import * as React from 'react';
import { Col, message, Modal, Radio, Row, Space, Spin } from 'antd';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useState, useMemo, useEffect } from 'react';
import Uniswap from '@/components/Uniswap';
import { useSelector } from 'umi';
import Web3 from 'web3';
import { Models } from '@/declare/modelType';
import { Config, favorTubeAbi, tokenAbi } from '@/config/config';

export type Props = {
  open: boolean;
  closeModal: () => void;
};
const SubModal: React.FC<Props> = (props) => {
  const { open } = props;

  const [value, setValue] = useState<number>(1);
  const [chainInfo, setChainInfo] = useState<Config | null>(null);
  const [preDataLoading, setPreDataLoading] = useState<boolean>(false);
  const [chainCoinBal, setChainCoinBal] = useState<number>(0);
  const [chainCoinBalLoading, setChainCoinBalLoading] =
    useState<boolean>(false);
  const [subPrice, setSubPrice] = useState<number>(0);

  const { nodeWeb3, address, tubeContract, tokenContract, tokenInfo } =
    useSelector((state: Models) => state.web3);
  const { config } = useSelector((state: Models) => state.global);
  const { info } = useSelector((state: Models) => state.dao);

  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const getPreData = async () => {
    setPreDataLoading(true);
    const preDataTimer = setTimeout(() => {
      message.info('Chain query failure');
      // props.closeModal();
    }, 1000 * 15);
    try {
      await getChainCoinBalance();
      console.log('contract', tubeContract, tokenContract);
      // @ts-ignore
      // const favorTubeContract = new nodeWeb3.eth.Contract(
      //   favorTubeAbi,
      //   chainInfo.favorTubeAddress,
      // );
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

  useEffect(() => {
    if (config) {
      setChainInfo(config);
    }
  }, [config]);

  return (
    <>
      <Modal
        title={'Subscribe ' + info?.name}
        open={open}
        centered
        destroyOnClose
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
              <span className={styles.value}>{info?.address}</span>
            </p>
            <p>
              <span className={styles.key}>Your Account:</span>&nbsp;
              <span className={styles.value}>{address}</span>
            </p>
            <p>
              <span style={{ marginRight: 20 }}>
                <span className={styles.key}>Your {tokenInfo.name}:</span>
                &nbsp;
                {chainCoinBalLoading ? (
                  <Spin indicator={loadIcon} size="small" />
                ) : (
                  <>
                    <span
                      className={styles.value}
                      style={{ marginRight: '4px' }}
                    >
                      {chainCoinBal}
                    </span>
                    {chainInfo?.faucet ? (
                      <a
                        href={chainInfo?.faucet}
                        target="_blank"
                        style={{ marginRight: '4px' }}
                      />
                    ) : (
                      <></>
                    )}
                    <SyncOutlined
                      className={styles.refresh}
                      onClick={getChainCoinBalance}
                    />
                  </>
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
