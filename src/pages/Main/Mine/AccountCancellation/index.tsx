import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useIntl } from '@@/plugin-locale/localeExports';
import prompt from '@/assets/icon/noToken-icon.svg';
import { useDispatch, useHistory, useSelector } from 'umi';
import { getDebounce, getKeyByName, isFavorApp } from '@/utils/util';
import { MetaMask, OKX, UniPass, WalletConnect } from '@/config/constants';
import { Models } from '@/declare/modelType';
import { useSignMessage } from 'wagmi';
import UserApi from '@/services/tube/UserApi';
import { useUrl } from '@/utils/hooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';

type Props = {};

type noticeItems = {
  text: string;
};

const AccountCancellation: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();
  const intl = useIntl();
  const history = useHistory();

  const { user } = useSelector((state: Models) => state.global);
  const { address, web3 } = useSelector((state: Models) => state.web3);

  const { data, signMessage } = useSignMessage();
  const [WCV2Timestamp, setWCV2Timestamp] = useState<number>(0);

  const noticeList: noticeItems[] = [
    {
      text: `${intl.formatMessage({
        id: 'accountCancellation.notice.text1',
      })}`,
    },
    {
      text: `${intl.formatMessage({
        id: 'accountCancellation.notice.text2',
      })}`,
    },
  ];

  const rejectClick = () => {
    history.goBack();
  };

  const confirmClick = async () => {
    const connectType = localStorage.getItem(getKeyByName('connectType'));
    if (connectType) {
      if (connectType === WalletConnect) {
        const timestamp = Date.parse(new Date().toUTCString());
        setWCV2Timestamp(timestamp);
        const msg = `delete ${address} account at ${timestamp}`;
        signMessage({ message: msg });
      } else {
        const timestamp = Date.parse(new Date().toUTCString());
        const msg = `delete ${address} account at ${timestamp}`;
        const signature = await web3?.eth.personal
          // @ts-ignore
          .sign(msg, address)
          .catch((err) => {
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
          const { data } = await UserApi.accountCancellation(url, {
            timestamp,
            signature,
            wallet_addr: address,
            type: typeData[connectType],
          });
          if (data.msg === 'success') {
            init();
            history.push('/cancellation/true');
          } else {
            history.push('/cancellation/false');
          }
        } catch {
          history.push('/cancellation/false');
        }
      }
    }
  };

  const walletConnectCancel = async (signature: `0x${string}`) => {
    try {
      const resData = await UserApi.accountCancellation(url, {
        timestamp: WCV2Timestamp,
        signature,
        wallet_addr: address,
        type: 'wallet_connect',
      });
      if (resData.data.msg === 'success') {
        init();
        history.push('/cancellation/true');
      } else {
        history.push('/cancellation/false');
      }
    } catch {
      history.push('/cancellation/false');
    }
  };

  const init = () => {
    localStorage.removeItem(getKeyByName('token'));
    localStorage.removeItem(getKeyByName('connectType'));
    dispatch({
      type: 'web3/updateState',
      payload: {
        web3: null,
        address: '',
      },
    });
    dispatch({
      type: 'global/updateState',
      payload: {
        user: null,
      },
    });
    dispatch({
      type: 'dao/updateState',
      payload: {
        userInfo: null,
      },
    });
  };

  useEffect(() => {
    if (data) {
      walletConnectCancel(data);
    }
  }, [data]);

  return (
    <div className={styles.accountCancellation}>
      <TopNavBar
        title={`${intl.formatMessage({
          id: 'accountCancellation.navBar.title',
        })}`}
        right={null}
      />
      <div className={styles.content}>
        <div className={styles.prompt}>
          <img src={prompt} alt="" className={styles.promptImg} />
          <div className={styles.title}>
            {intl.formatMessage({
              id: 'accountCancellation.prompt.title',
            })}
          </div>
          <div className={styles.text}>
            {intl.formatMessage({
              id: 'accountCancellation.prompt.text',
            })}
          </div>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeBlock}>
            {noticeList.map((item, index) => (
              <div key={index} className={styles.textBlock}>
                <div className={styles.square} />
                <p className={styles.text}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <div className={styles.reject} onClick={rejectClick}>
          {intl.formatMessage({
            id: 'accountCancellation.reject',
          })}
        </div>
        <div className={styles.confirm} onClick={getDebounce(confirmClick)}>
          {intl.formatMessage({
            id: 'accountCancellation.confirm',
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountCancellation;
