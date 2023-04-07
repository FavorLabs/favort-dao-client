import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import UserAvatar from '@/components/UserAvatar';
import { omitAddress } from '@/utils/util';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Statistic } from '@/declare/tubeApiType';
import UserApi from '@/services/tube/UserApi';
import { message } from 'antd';
import { Tabs } from 'antd-mobile';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { history, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import qrCodeSvg from '@/assets/icon/qr-code.svg';
import ethCoinSvg from '@/assets/icon/eth-coin.svg';
import btcCoinSvg from '@/assets/icon/btc-coin.svg';

export type Props = {};
type UserDataItems = {
  name: string;
  count: number;
};
type TabItems = {
  key: number;
  name: ReactNode;
  content: ReactNode;
};
type ChainItem = {
  chainName: string;
  icon: ReactNode;
  balance: number;
};
const Token: React.FC<Props> = (props) => {
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const userInfoRef = useRef(null);

  const [userStatistic, setUserStatistic] = useState<Statistic>({
    comment_count: 0,
    dao_count: 0,
    upvote_count: 0,
  });

  const { user } = useSelector((state: Models) => state.global);
  const { address } = useSelector((state: Models) => state.web3);

  const userStatisticItems: UserDataItems[] = [
    {
      name: 'Joined',
      count: userStatistic.dao_count,
    },
    {
      name: 'Level',
      count: 0,
    },
  ];

  const chainItems: ChainItem[] = [
    {
      chainName: 'ETH',
      icon: <img className={styles.chainIcon} src={ethCoinSvg} alt={''} />,
      balance: 0,
    },
    {
      chainName: 'BTC',
      icon: <img className={styles.chainIcon} src={btcCoinSvg} alt={''} />,
      balance: 0,
    },
  ];

  const tabItems: TabItems[] = [
    {
      key: 1,
      name: <div className={'tokenTabName'}>On Chain</div>,
      content: (
        <div className={styles.onChain}>
          {chainItems.map((item) => (
            <div className={styles.chainItem} key={item.chainName}>
              <div className={styles.left}>
                {item.icon}
                <span className={styles.chainName}>{item.chainName}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.balance}>{item.balance}</span>
                <span className={styles.value}>$0</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 2,
      name: <div className={'tokenTabName'}>Internal</div>,
      content: <div />,
    },
  ];

  const getStatistic = async () => {
    try {
      const { data } = await UserApi.getStatistic(url);
      if (data.data) setUserStatistic(data.data);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  useEffect(() => {
    getStatistic();
  }, []);

  return (
    <div className={styles.token}>
      <TopNavBar title={'Token'} right={null} />
      <div className={styles.userInfo} ref={userInfoRef}>
        <div className={styles.info}>
          {user && (
            <UserAvatar
              className={styles.avatar}
              prefix={avatarsResUrl}
              identifier={user.avatar}
              name={user.nickname}
              size={50}
            />
          )}
          <div className={styles.details}>
            <p className={styles.name}>{user?.nickname}</p>
            <span className={styles.address}>
              {omitAddress(address, 6, 14)}
            </span>
            {/*<div className={styles.balance}>{Number(balance).toFixed(4)}</div>*/}
          </div>
        </div>
        <div className={styles.data}>
          {userStatisticItems.map((item) => (
            <div className={styles.items} key={item.name}>
              <div className={styles.count}>{item.count}</div>
              <div className={styles.label}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tabWrap}>
        <Tabs
          className={'tokenTabs'}
          activeLineMode={'fixed'}
          style={{
            '--active-title-color': 'rgba(33, 33, 33, 1)',
            '--active-line-color': 'rgba(255, 166, 0, 1)',
            '--active-line-height': '0.25rem',
            '--fixed-active-line-width': '1.25rem',
            '--content-padding': '0 1.25rem',
          }}
        >
          {tabItems.map((item) => (
            <Tabs.Tab title={item.name} key={item.key}>
              {item.content}
            </Tabs.Tab>
          ))}
        </Tabs>
        <img
          className={styles.qrCode}
          src={qrCodeSvg}
          alt=""
          onClick={() => {
            history.push('/qrcode');
          }}
        />
      </div>
    </div>
  );
};

export default Token;
