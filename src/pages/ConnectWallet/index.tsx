import * as React from 'react';
import styles from './index.less';
import { useState } from 'react';
import metamask_png from '@/assets/img/metamask.png';
import walletConnect_png from '@/assets/img/walletconnect.png';
import okx_png from '@/assets/img/okx.png';
import unipass_png from '@/assets/img/unipass.png';
import {
  MetaMask,
  WalletConnect,
  OKX,
  ConnectType,
  UniPass,
} from '@/config/constants';
import { connect } from '@/utils/connect';
import { message, Button } from 'antd';
import { useDispatch, history } from 'umi';
import { WalletType } from '@/declare/global';
import UserApi from '@/services/tube/UserApi';
import { useUrl } from '@/utils/hooks';
import Web3 from 'web3';
import { isMobile } from '@/config/config';

const ConnectWallet: React.FC = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [cType, setCType] = useState('');
  const [loading, setLoading] = useState(false);

  const connectWallet = (connectType: WalletType) => {
    init();
    connect(connectType)
      .then(({ web3, address }) => {
        setCType(connectType);
        setAddress(address.toLowerCase());
        setWeb3(web3);
      })
      .catch((reason) => {
        message.warning(reason?.message);
      });
  };

  const walletList: { name: WalletType; icon: string; show: boolean }[] = [
    {
      icon: unipass_png,
      name: UniPass,
      show: true,
    },
    {
      icon: walletConnect_png,
      name: WalletConnect,
      show: true,
    },
    {
      icon: metamask_png,
      name: MetaMask,
      show: !isMobile,
    },
    {
      icon: okx_png,
      name: OKX,
      show: !isMobile,
    },
  ];

  const init = () => {
    setCType('');
    setAddress('');
    setWeb3(null);
  };

  const reset = () => {
    init();
    // @ts-ignore
    web3?.currentProvider?.disconnect?.();
  };

  const signIn = async () => {
    if (loading) return;
    setLoading(true);
    const timespan = Date.now();
    const msg = `${address} login FavorTube at ${timespan}`;
    // @ts-ignore
    const signature = await web3?.eth.personal
      ?.sign(msg, address)
      .catch((err) => {
        setLoading(false);
        message.info(err.message);
      });

    if (!signature) return;

    UserApi.signIn(url, { timespan, signature, address })
      .then(({ data }) => {
        dispatch({
          type: 'web3/updateState',
          payload: {
            web3,
            address,
          },
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem(ConnectType, cType);
        history.replace('/main');
      })
      .catch((err) => {
        setLoading(false);
        message.info(err.message);
      });
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.title}>Connect Wallet</h1>
      {walletList.map((item) => (
        <div key={item.name}>
          {item.show && (!cType || cType === item.name) && (
            <div
              className={styles.wallet}
              onClick={() => connectWallet(item.name)}
            >
              <div className={styles.icon}>
                <img src={item.icon} alt={item.name} />
              </div>
              <div className={styles.name}>{item.name.toUpperCase()}</div>
            </div>
          )}
        </div>
      ))}
      {cType && (
        <div className={styles.reset} onClick={reset}>
          RESET
        </div>
      )}
      {cType && (
        <Button
          className={styles.signIn}
          type="primary"
          loading={loading}
          onClick={signIn}
        >
          SIGN IN
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
