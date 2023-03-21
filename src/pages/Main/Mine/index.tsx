import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  useHistory,
  useSelector,
  getLocale,
  setLocale,
  getAllLocales,
  useIntl,
  useDispatch,
} from 'umi';
import { message } from 'antd';
import { Dialog } from 'antd-mobile';
import { Models } from '@/declare/modelType';
import { getTokenKey, omitAddress } from '@/utils/util';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { switchTheme } from '@/utils/util';
import { Statistic } from '@/declare/tubeApiType';
import { Popover } from 'antd-mobile';
import { ThemeType } from '@/utils/setTheme';
import { defaultTheme } from '@/config/themeConfig';
import { ConnectType, WalletConnect } from '@/config/constants';
import UserApi from '@/services/tube/UserApi';
import tokenSvg from '@/assets/icon/token.svg';
import nftSvg from '@/assets/icon/nft.svg';
import SettingSvg from '@/assets/icon/setting.svg';
import pluginMarketSvg from '@/assets/icon/plugin.svg';
import web3AirdopsSvg from '@/assets/icon/web3.svg';
import daoAirdopsSvg from '@/assets/icon/dao_s.svg';
import promotionSvg from '@/assets/icon/promotion.svg';
import rightArrowSvg from '@/assets/icon/rightArrow.svg';

export type Props = {};
type SettingItem = {
  key: number;
  name: string;
  content: ReactNode;
};
type UserDataItems = {
  name: string;
  count: number;
};
type OptionItems = {
  name: string;
  icon: ReactNode;
  path: string;
};

const Mine: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const intl = useIntl();
  const dispatch = useDispatch();
  const userInfoRef = useRef(null);

  const theme = localStorage.getItem('theme');

  const [balance, setBalance] = useState('0');
  const [userStatistic, setUserStatistic] = useState<Statistic>({
    comment_count: 0,
    dao_count: 0,
    upvote_count: 0,
  });
  const [langMenuVisibility, setLangMenuVisibility] = useState<boolean>(false);
  const [themeType, setThemeType] = useState<ThemeType>(
    (theme as ThemeType) || (defaultTheme as ThemeType),
  );
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const { user } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { address, web3 } = useSelector((state: Models) => state.web3);

  const localeLang = getLocale();
  const isLight = themeType === 'light';
  const isDark = themeType === 'dark';

  const switchLang = (lang: string) => {
    setLocale(lang, false);
    setLangMenuVisibility(false);
  };

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'en-US':
        return intl.formatMessage({ id: 'main.mine.setting.language-english' });
      case 'zh-CN':
        return intl.formatMessage({ id: 'main.mine.setting.language-chinese' });
      default:
        return intl.formatMessage({ id: 'main.mine.setting.language-english' });
    }
  };

  const userStatisticItems: UserDataItems[] = [
    {
      name: 'Joined',
      count: userStatistic.dao_count,
    },
    {
      name: 'Likes',
      count: userStatistic.upvote_count,
    },
    {
      name: 'Comments',
      count: userStatistic.comment_count,
    },
    {
      name: 'Friends',
      count: 0,
    },
  ];

  const cryptoAssetsItems: OptionItems[] = [
    {
      name: 'Token',
      icon: <img src={tokenSvg} alt={''} />,
      path: '',
    },
    {
      name: 'NFT',
      icon: <img src={nftSvg} alt={''} />,
      path: '',
    },
  ];

  const daoManagementItems: OptionItems[] = [
    {
      name: 'Setting',
      icon: <img src={SettingSvg} alt={''} />,
      path: '',
    },
    {
      name: 'Plugin Market',
      icon: <img src={pluginMarketSvg} alt={''} />,
      path: '',
    },
  ];

  const servicesItems: OptionItems[] = [
    {
      name: 'Web3 Airdops',
      icon: <img src={web3AirdopsSvg} alt={''} />,
      path: '',
    },
    {
      name: 'DAO Airdops',
      icon: <img src={daoAirdopsSvg} alt={''} />,
      path: '',
    },
    {
      name: 'Promotion',
      icon: <img src={promotionSvg} alt={''} />,
      path: '',
    },
  ];

  const settingItems: SettingItem[] = [
    {
      key: 1,
      name: intl.formatMessage({ id: 'main.mine.setting.language' }),
      content: (
        <div className={styles.langAction}>
          <Popover
            content={
              <div className={styles.languageList}>
                {getAllLocales().map((item) => (
                  <span
                    key={item}
                    onClick={() => {
                      switchLang(item);
                    }}
                  >
                    {getLanguageName(item)}
                  </span>
                ))}
              </div>
            }
            trigger="click"
            visible={langMenuVisibility}
            placement="bottom"
            className={styles.popover}
          >
            <span
              className={styles.lang}
              onClick={(e) => {
                e.stopPropagation();
                // setLangMenuVisibility(true);
              }}
            >
              {intl.formatMessage({ id: 'main.mine.setting.language-value' })}
              <img className={styles.rightArrow} src={rightArrowSvg} alt="" />
            </span>
          </Popover>
        </div>
      ),
    },
    {
      key: 2,
      name: intl.formatMessage({ id: 'main.mine.setting.theme' }),
      content: (
        <div className={styles.themeAction}>
          <div
            className={styles.switchBtn}
            onClick={() => {
              // switchTheme();
              // if (isLight) {
              //   setThemeType('dark');
              // } else {
              //   setThemeType('light');
              // }
            }}
          >
            <div
              className={`${styles.option} ${isLight && 'themeBtnActive'}`}
              onClick={(e) => {
                isLight && e.stopPropagation();
              }}
            >
              {intl.formatMessage({ id: 'main.mine.setting.theme-light' })}
            </div>
            <div
              className={`${styles.option} ${isDark && 'themeBtnActive'}`}
              onClick={(e) => {
                isDark && e.stopPropagation();
              }}
            >
              {intl.formatMessage({ id: 'main.mine.setting.theme-dark' })}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 3,
      name: intl.formatMessage({ id: 'main.mine.setting.about' }),
      content: <div className={styles.aboutAction}>version 1.0</div>,
    },
    {
      key: 4,
      name: intl.formatMessage({ id: 'main.mine.setting.logout' }),
      content: (
        <div className={styles.logoutAction}>
          <img src={rightArrowSvg} alt="" />
        </div>
      ),
    },
  ];

  const getBalance = async () => {
    if (!web3) return;
    const b = await web3.eth.getBalance(address);
    if (b) setBalance(web3.utils.fromWei(b, 'ether'));
  };

  const getStatistic = async () => {
    try {
      const { data } = await UserApi.getStatistic(url);
      if (data.data) setUserStatistic(data.data);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const logout = () => {
    localStorage.removeItem(getTokenKey());
    localStorage.removeItem(ConnectType);
    const connectType = localStorage.getItem(ConnectType);
    if (connectType && connectType === WalletConnect) {
      localStorage.removeItem('walletconnect');
    }
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
    getStatistic();
  }, []);

  useEffect(() => {
    if (web3) {
      getBalance();
    }
  }, [web3]);

  useEffect(() => {
    if (!web3 && !address && !user && !userInfo) {
      history.replace('/');
    }
  }, [web3, address, user, userInfo]);

  return (
    <>
      <div
        className={styles.content}
        onClick={() => {
          setLangMenuVisibility(false);
        }}
      >
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
        <div
          className={`${styles.cryptoAssets} ${styles.block}`}
          style={{
            // @ts-ignore
            marginTop: userInfoRef?.current?.clientHeight,
          }}
        >
          <p className={styles.title}>Crypto Assets</p>
          <div className={styles.itemsList}>
            {cryptoAssetsItems.map((item) => (
              <div
                key={item.name}
                className={styles.item}
                onClick={() => {
                  item.path && history.push(item.path);
                }}
              >
                <div className={styles.icon}>{item.icon}</div>
                <p className={styles.name}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        {userInfo && (
          <>
            <div className={`${styles.daoManagement} ${styles.block}`}>
              <p className={styles.title}>DAO Management</p>
              <div className={styles.itemsList}>
                {daoManagementItems.map((item) => (
                  <div
                    key={item.name}
                    className={styles.item}
                    onClick={() => {
                      item.path && history.push(item.path);
                    }}
                  >
                    <div className={styles.icon}>{item.icon}</div>
                    <p className={styles.name}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.services} ${styles.block}`}>
              <p className={styles.title}>Services</p>
              <div className={styles.itemsList}>
                {servicesItems.map((item) => (
                  <div
                    key={item.name}
                    className={styles.item}
                    onClick={() => {
                      item.path && history.push(item.path);
                    }}
                  >
                    <div className={styles.icon}>{item.icon}</div>
                    <p className={styles.name}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className={`${styles.setting} ${styles.block}`}>
          {settingItems.map((item) => (
            <div
              className={styles.settingItem}
              key={item.name}
              onClick={() => {
                if (item.key === 4) {
                  setLogoutDialog(true);
                }
              }}
            >
              <div className={styles.name}>{item.name}</div>
              <div className={styles.action}>{item.content}</div>
            </div>
          ))}
        </div>
        <Dialog
          visible={logoutDialog}
          content={
            <div className={styles.dialog}>
              <div className={styles.text}>Sure you want to log out?</div>
              <div className={styles.actions}>
                <span
                  className={styles.cancel}
                  onClick={() => {
                    setLogoutDialog(false);
                  }}
                >
                  cancel
                </span>
                <span className={styles.confirm} onClick={logout}>
                  confirm
                </span>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default Mine;
