import * as React from 'react';
import styles from './index.less';

import metamask_png from '@/assets/img/metamask.png';
import walletConnect_png from '@/assets/img/walletconnect.png';
import okx_png from '@/assets/img/okx.png';
import { MetaMask, WalletConnect, OKX, ConnectType } from '@/config/constants';
import { connect } from '@/utils/connect';
import { message } from 'antd';
import { useDispatch, history } from 'umi';
import { WalletType } from '@/declare/global';

const ConnectWallet: React.FC = (props) => {
  const dispatch = useDispatch();
  const connectWallet = (connectType: WalletType) => {
    connect(connectType)
      .then(({ web3, address }) => {
        dispatch({
          type: 'global/updateState',
          payload: {
            web3,
            address,
          },
        });
        localStorage.setItem(ConnectType, connectType);
        history.push('home');
      })
      .catch((reason) => {
        message.warning(reason?.message);
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

  return (
    <div>
      <div className={styles.box}>
        <h1 className={styles.title}>Connect Wallet</h1>
        {walletList.map((item) => (
          <div
            key={item.name}
            className={styles.wallet}
            onClick={() => connectWallet(item.name)}
          >
            <div className={styles.icon}>
              <img src={item.icon} alt={item.name} />
            </div>
            <div className={styles.name}>{item.name.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectWallet;
