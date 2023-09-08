import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import metamask_png from '@/assets/img/metamask.png';
import walletConnect_png from '@/assets/img/walletconnect.png';
import okx_png from '@/assets/img/okx.png';
import unipass_png from '@/assets/img/unipass.png';
import {
  ConnectType,
  MetaMask,
  OKX,
  UniPass,
  WalletConnect,
} from '@/config/constants';
import { connect } from '@/utils/connect';
import { Button, message } from 'antd';
import { history, useDispatch, useSelector } from 'umi';
import { WalletType } from '@/declare/global';
import UserApi from '@/services/tube/UserApi';
import { useUrl } from '@/utils/hooks';
import Web3 from 'web3';
import { getKeyByName, isFavorApp, isMobile } from '@/utils/util';
import { Models } from '@/declare/modelType';
import { Config } from '@/config/config';
import SvgIcon from '@/components/SvgIcon';
import homeSvg from '@/assets/icon/home.svg';
import leftArrow from '@/assets/icon/left-arrow.svg';
import loginLog from '@/assets/icon/loginLog.svg';
import rightArrow from '@/assets/icon/rightArrow.svg';
import Flutter from '@/utils/flutter';

const ConnectWallet: React.FC = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [cType, setCType] = useState('');
  const [loading, setLoading] = useState(false);

  const { config } = useSelector((state: Models) => state.global);

  const connectWallet = (connectType: WalletType) => {
    init();
    connect(connectType, false, config as Config)
      .then(({ web3, address }) => {
        setCType(connectType);
        setAddress(address.toLowerCase());
        setWeb3(web3);
        // @ts-ignore
        web3?.currentProvider?.once('disconnect', init);
      })
      .catch((reason) => {
        console.log(reason);
        message.warning(reason?.message);
      });
  };

  const walletList: {
    name: WalletType;
    icon: string;
    show: boolean;
    introduction: string;
  }[] = [
    {
      icon: unipass_png,
      name: UniPass,
      show: true,
      introduction: 'To connect to the Unipass wallet',
    },
    {
      icon: walletConnect_png,
      name: WalletConnect,
      show: true,
      introduction: 'To connect to other wallets',
    },
    {
      icon: metamask_png,
      name: MetaMask,
      show: !isMobile(),
      introduction: 'To connect to the MetaMask',
    },
    {
      icon: okx_png,
      name: OKX,
      show: !isMobile(),
      introduction: 'To connect to the OKX',
    },
  ];

  const init = () => {
    setCType('');
    setAddress('');
    setWeb3(null);
    setLoading(false);
  };

  const reset = () => {
    init();
    // @ts-ignore
    web3?.currentProvider?.disconnect?.();
  };

  const signIn = async () => {
    if (loading) return;
    setLoading(true);
    const timestamp = Date.parse(new Date().toUTCString());
    const msg = `${address} login FavorDAO at ${timestamp}`;
    const signature = await web3?.eth.personal
      // @ts-ignore
      .sign(msg, address)
      .catch((err) => {
        setLoading(false);
        message.info(err.message);
      });

    if (!signature) return;

    const typeData: Record<string, string> = {
      [WalletConnect]: 'wallet_connect',
      [MetaMask]: 'meta_mask',
      [OKX]: 'okx',
      [UniPass]: isFavorApp() ? 'unipass_std' : 'unipass_eth',
    };

    try {
      const { data } = await UserApi.signIn(url, {
        timestamp,
        signature,
        wallet_addr: address,
        type: typeData[cType],
      });
      if (isFavorApp()) Flutter.chatLogin(data.data.token);
      localStorage.setItem(getKeyByName('token'), data.data.token);
      const info = await UserApi.getInfo(url);
      dispatch({
        type: 'web3/updateState',
        payload: {
          web3,
          address,
        },
      });
      dispatch({
        type: 'global/updateState',
        payload: {
          user: info.data.data,
        },
      });
      localStorage.setItem(getKeyByName('connectType'), cType);
      history.replace('/');
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) message.info(e.message);
    }
  };

  return (
    <div className={styles.box}>
      <div
        className={styles.toHome}
        onClick={() => {
          history.push('/');
        }}
      >
        <SvgIcon svg={leftArrow} />
      </div>
      <div className={styles.content}>
        <img src={loginLog} alt="" className={styles.loginImg} />
        <p className={styles.title}>Sign In</p>
        {walletList.map((item) => (
          <div key={item.name} className={styles.block}>
            {item.show && (!cType || cType === item.name) && (
              <div
                className={styles.wallet}
                onClick={() => connectWallet(item.name)}
              >
                <div className={styles.icon}>
                  <img src={item.icon} alt={item.name} />
                </div>
                <div className={styles.text}>
                  <p className={styles.name}>{item.name.toUpperCase()}</p>
                  <p className={styles.introduction}>{item.introduction}</p>
                </div>
                <img src={rightArrow} alt="" className={styles.rightArrow} />
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
    </div>
  );
};

export default ConnectWallet;
