import * as React from 'react';
import styles from './index.less';
import { useState } from 'react';
import metamask_png from '@/assets/img/metamask.png';
import walletConnect_png from '@/assets/img/walletconnect.png';
import okx_png from '@/assets/img/okx.png';
import { MetaMask, WalletConnect, OKX, ConnectType } from '@/config/constants';
import { connect } from '@/utils/connect';
import { message, Button } from 'antd';
import { useDispatch, history, useSelector } from 'umi';
import { WalletType } from '@/declare/global';
import { Models } from '@/declare/modelType';
import moment from 'moment';
import ProxyApi from '@/services/ProxyApi';
import { useUrl } from '@/utils/hooks';

const ConnectWallet: React.FC = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();
  const [cType, setCType] = useState('');
  const [loading, setLoading] = useState(false);

  const { web3, address } = useSelector((state: Models) => state.global);

  const connectWallet = (connectType: WalletType) => {
    init();
    connect(connectType)
      .then(({ web3, address }) => {
        dispatch({
          type: 'global/updateState',
          payload: {
            web3,
            address,
          },
        });
        setCType(connectType);
        localStorage.setItem(ConnectType, connectType);
        // history.push('/main');
      })
      .catch((reason) => {
        message.warning(reason?.message);
        setCType('');
      });
  };

  const walletList: { name: WalletType; icon: string }[] = [
    {
      icon: metamask_png,
      name: MetaMask,
    },
    {
      icon: walletConnect_png,
      name: WalletConnect,
    },
    {
      icon: okx_png,
      name: OKX,
    },
  ];

  const init = () => {
    setCType('');
    dispatch({
      type: 'global/updateState',
      payload: {
        token: null,
      },
    });
  };

  const reset = () => {
    init();
    // @ts-ignore
    web3?.currentProvider?.disconnect?.();
  };

  const signIn = async () => {
    if (loading) return;
    setLoading(true);
    const timespan = moment().format('x');
    const msg = `${address} login FavorTube at ${timespan}`;
    // @ts-ignore
    const signature = await web3?.eth.personal
      ?.sign(msg, address)
      .catch((err) => {
        setLoading(false);
        message.info(err.message);
      });

    if (!signature) return;

    await ProxyApi.signIn(url, { timespan, signature, address, newMsg: true })
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        dispatch({
          type: 'global/updateState',
          payload: {
            token: data.token,
          },
        });
        history.replace('/main');
      })
      .catch((err) => {
        setLoading(false);
        message.info(err.response.data.error);
      });
  };

  return (
    <div>
      <div className={styles.box}>
        <h1 className={styles.title}>Connect Wallet</h1>
        {walletList.map((item) => (
          <div key={item.name}>
            {!cType || cType === item.name ? (
              <div
                className={styles.wallet}
                onClick={() => connectWallet(item.name)}
              >
                <div className={styles.icon}>
                  <img src={item.icon} alt={item.name} />
                </div>
                <div className={styles.name}>{item.name.toUpperCase()}</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
        {cType ? (
          <div className={styles.reset} onClick={reset}>
            RESET
          </div>
        ) : (
          <></>
        )}
        {cType ? (
          <Button
            className={styles.signIn}
            type="primary"
            loading={loading}
            onClick={signIn}
          >
            SIGN IN
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
