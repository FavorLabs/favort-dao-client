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
import { Dialog, Input, Switch } from 'antd-mobile';
import { Models } from '@/declare/modelType';
import { getKeyByName, isFavorApp, isMobile, omitAddress } from '@/utils/util';
import UserAvatar from '@/components/UserAvatar';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { switchTheme } from '@/utils/util';
import { Statistic } from '@/declare/tubeApiType';
import { Popover } from 'antd-mobile';
import { setTheme, ThemeType } from '@/utils/setTheme';
import { defaultTheme } from '@/config/themeConfig';
import { ConnectType, WalletConnect } from '@/config/constants';
import UserApi from '@/services/tube/UserApi';
import tokenSvg from '@/assets/icon/token.svg';
import nftSvg from '@/assets/icon/nft.svg';
import SettingSvg from '@/assets/icon/setting.svg';
import pluginMarketSvg from '@/assets/icon/plugin.svg';
import web3AirdopsSvg from '@/assets/icon/web3.svg';
import daoAirdopsSvg from '@/assets/icon/dao_s.svg';
import rightArrowSvg from '@/assets/icon/rightArrow.svg';
import langSvg from '@/assets/icon/language.svg';
import darkSvg from '@/assets/icon/dark.svg';
import aboutSvg from '@/assets/icon/about.svg';
import logoutSvg from '@/assets/icon/logout.svg';
import pendingSvg from '@/assets/icon/pending.svg';
import onGoingSvg from '@/assets/icon/ongoimg.svg';
import finishedSvg from '@/assets/icon/finished.svg';
import byMeSvg from '@/assets/icon/byme.svg';
import editIcon from '@/assets/icon/edit-icon.svg';
import noToken from '@/assets/icon/noDevelop/token.svg';
import noNft from '@/assets/icon/noDevelop/NFT.svg';
import noSetting from '@/assets/icon/noDevelop/setting.svg';
import noPluginMarket from '@/assets/icon/noDevelop/plugin.svg';
import noWeb3Airdops from '@/assets/icon/noDevelop/web3.svg';
import noDaoAirdops from '@/assets/icon/noDevelop/dao.svg';
import noPending from '@/assets/icon/noDevelop/pending.svg';
import noOnGoing from '@/assets/icon/noDevelop/ongoimg.svg';
import noFinished from '@/assets/icon/noDevelop/finished.svg';
import noByMe from '@/assets/icon/noDevelop/byme.svg';
import Flutter from '@/utils/flutter';
import { useDisconnect } from 'wagmi';

export type Props = {};
type SettingItem = {
  key: number;
  name: string;
  icon: ReactNode;
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
  key?: string;
};

const Mine: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const intl = useIntl();
  const dispatch = useDispatch();
  const userInfoRef = useRef(null);

  const theme = localStorage.getItem('theme');

  const { disconnectAsync } = useDisconnect();

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
  const [changeNameDialog, setChangeNameDialog] = useState<boolean>(false);

  const { user } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { address, web3 } = useSelector((state: Models) => state.web3);

  const [nameValue, setNameValue] = useState<string | undefined>(
    user?.nickname,
  );
  const [nickName, setNickName] = useState<string | undefined>(user?.nickname);
  const [isDevelop, setIsDevelop] = useState<boolean>(false);
  const [isTheme, setIsTheme] = useState<boolean>(true);

  const localeLang = getLocale();
  const isLight = themeType === 'light';
  const isDark = themeType === 'dark';

  const getTheme = () => {
    let theme = localStorage.getItem('theme');
    switch (theme) {
      case 'light':
        setIsTheme(true);
        break;
      case 'dark':
        setIsTheme(false);
    }
  };

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
      name: intl.formatMessage({ id: 'main.mine.userStatistic.joined' }),
      count: userStatistic.dao_count,
    },
    {
      name: intl.formatMessage({ id: 'main.mine.userStatistic.level' }),
      count: 0,
    },
    // {
    //   name: 'Likes',
    //   count: userStatistic.upvote_count,
    // },
    // {
    //   name: 'Comments',
    //   count: userStatistic.comment_count,
    // },
    // {
    //   name: 'Friends',
    //   count: 0,
    // },
  ];

  const cryptoAssetsItems: OptionItems[] = [
    {
      name: 'Token',
      icon: <img src={isDevelop ? tokenSvg : noToken} alt={''} />,
      path: '/token',
    },
    {
      name: 'NFT',
      icon: <img src={isDevelop ? nftSvg : noNft} alt={''} />,
      path: '',
    },
  ];

  const daoManagementItems: OptionItems[] = [
    {
      name: intl.formatMessage({ id: 'main.mine.daoManagement.setting' }),
      icon: <img src={isDevelop ? SettingSvg : noSetting} alt={''} />,
      path: '/setting',
    },
    {
      name: intl.formatMessage({ id: 'main.mine.daoManagement.pluginMarket' }),
      icon: <img src={isDevelop ? pluginMarketSvg : noPluginMarket} alt={''} />,
      path: '/pluginForDAOs',
    },
  ];

  const servicesItems: OptionItems[] = [
    {
      name: intl.formatMessage({ id: 'main.mine.services.web3Airdops' }),
      icon: <img src={isDevelop ? web3AirdopsSvg : noWeb3Airdops} alt={''} />,
      path: '/web3Page',
    },
    {
      name: intl.formatMessage({ id: 'main.mine.services.DAOAirdops' }),
      icon: <img src={isDevelop ? daoAirdopsSvg : noDaoAirdops} alt={''} />,
      path: '/dAOPage',
    },
    // {
    //   name: 'Promotion',
    //   icon: <img src={promotionSvg} alt={''} />,
    //   path: '/promotionTaskList',
    // },
  ];

  const promotionItems: OptionItems[] = [
    {
      name: intl.formatMessage({ id: 'main.mine.promotion.pending' }),
      icon: <img src={isDevelop ? pendingSvg : noPending} alt={''} />,
      path: '/promotionTaskList',
      key: 'Pending',
    },
    {
      name: intl.formatMessage({ id: 'main.mine.promotion.onGoing' }),
      icon: <img src={isDevelop ? onGoingSvg : noOnGoing} alt={''} />,
      path: '/promotionTaskList',
      key: 'OnGoing',
    },
    {
      name: intl.formatMessage({ id: 'main.mine.promotion.finished' }),
      icon: <img src={isDevelop ? finishedSvg : noFinished} alt={''} />,
      path: '/promotionTaskList',
      key: 'Finished',
    },
    {
      name: intl.formatMessage({ id: 'main.mine.promotion.byMe' }),
      icon: <img src={isDevelop ? byMeSvg : noByMe} alt={''} />,
      path: '/promotionTaskList',
      key: 'ByMe',
    },
  ];

  const settingItems: SettingItem[] = [
    {
      key: 1,
      name: intl.formatMessage({ id: 'main.mine.setting.language' }),
      icon: <img src={langSvg} alt={''} />,
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
            className={'popover'}
          >
            <span
              className={styles.lang}
              onClick={(e) => {
                e.stopPropagation();
                if (NETWORK_ID === '19') {
                  setLangMenuVisibility(true);
                }
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
      icon: <img src={darkSvg} alt={''} />,
      content: (
        <div className={styles.themeAction}>
          <Switch
            checked={isTheme}
            style={{
              '--checked-color': 'rgba(255, 166, 0, 1)',
              '--height': '1.375rem',
              '--width': '2.75rem',
            }}
            onChange={() => {
              // switchTheme();
              // getTheme();
            }}
          />
        </div>
      ),
    },
    {
      key: 3,
      name: intl.formatMessage({ id: 'main.mine.setting.about' }),
      icon: <img src={aboutSvg} alt={''} />,
      content: <div className={styles.aboutAction}>version 1.0.0406</div>,
    },
    {
      key: 4,
      name: intl.formatMessage({ id: 'main.mine.setting.logout' }),
      icon: <img src={logoutSvg} alt={''} />,
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

  const logout = async () => {
    if (isFavorApp()) Flutter.chatLogout();
    const connectType = localStorage.getItem(getKeyByName('connectType'));
    if (connectType && connectType === WalletConnect) {
      await disconnectAsync();
      localStorage.removeItem('walletconnect');
    }
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

  const changeName = async () => {
    setChangeNameDialog(false);
    try {
      const { data } = await UserApi.changeNickName(url, nameValue);
      if (data.msg === 'success') {
        setNickName(nameValue);
        dispatch({
          type: 'global/updateState',
          payload: {
            user: { ...user, nickname: nameValue },
          },
        });
        message.success(
          `${intl.formatMessage({
            id: 'mine.dialog.changeName.messageSuccess',
          })}`,
        );
      } else {
        message.error(
          `${intl.formatMessage({
            id: 'mine.dialog.changeName.messageError',
          })}`,
        );
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setNameValue(nickName);
    }
  };

  const settingClick = (key: number) => {
    switch (key) {
      case 4:
        setLogoutDialog(true);
        break;
    }
  };

  useEffect(() => {
    getStatistic();
    getTheme();
  }, []);

  useEffect(() => {
    if (web3) {
      // getBalance();
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
              <div className={styles.nameRow}>
                <p className={styles.name}>{nickName}</p>
                <img
                  src={editIcon}
                  alt=""
                  className={styles.image}
                  onClick={() => setChangeNameDialog(true)}
                />
              </div>
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
          className={styles.operate}
          style={{
            height: `calc(${isMobile() ? '100vh' : '80vh'} - 3.75rem - ${
              // @ts-ignore
              userInfoRef?.current?.clientHeight / 16 + 'rem'
            } - 2rem)`,
            // @ts-ignore
            marginTop: `${userInfoRef?.current?.clientHeight / 16 + 'rem'}`,
            overflowY: 'scroll',
          }}
        >
          {(NETWORK_ID === '18' || NETWORK_ID === '19') && (
            <>
              <div className={`${styles.cryptoAssets} ${styles.block}`}>
                <p className={styles.title}>
                  {intl.formatMessage({ id: 'main.mine.crypto.title' })}
                </p>
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
                      <p
                        className={`${
                          isDevelop ? styles.name : styles.noDevelop
                        }`}
                      >
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {userInfo && (
                <>
                  <div className={`${styles.daoManagement} ${styles.block}`}>
                    <p className={styles.title}>
                      {intl.formatMessage({
                        id: 'main.mine.DAOManagement.title',
                      })}
                    </p>
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
                          <p
                            className={`${
                              isDevelop ? styles.name : styles.noDevelop
                            }`}
                          >
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.services} ${styles.block}`}>
                    <p className={styles.title}>
                      {intl.formatMessage({ id: 'main.mine.services.title' })}
                    </p>
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
                          <p
                            className={`${
                              isDevelop ? styles.name : styles.noDevelop
                            }`}
                          >
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.services} ${styles.block}`}>
                    <p className={styles.title}>
                      {intl.formatMessage({ id: 'main.mine.promotion.title' })}
                    </p>
                    <div className={styles.itemsList}>
                      {promotionItems.map((item) => (
                        <div
                          key={item.name}
                          className={styles.item}
                          onClick={() => {
                            item.path &&
                              history.push(`${item.path}/${item.key}`);
                          }}
                        >
                          <div className={styles.icon}>{item.icon}</div>
                          <p
                            className={`${
                              isDevelop ? styles.name : styles.noDevelop
                            }`}
                          >
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className={`${styles.setting} ${styles.block}`}>
            {settingItems.map((item) => (
              <div
                className={styles.settingItem}
                key={item.name}
                onClick={() => {
                  settingClick(item.key);
                }}
              >
                <div className={styles.iconName}>
                  {item.icon}
                  <div className={styles.name}>{item.name}</div>
                </div>
                <div className={styles.action}>{item.content}</div>
              </div>
            ))}
          </div>
        </div>
        {/*<CustomSwiper items={swiperItems} spacing={10} />*/}
        <Dialog
          visible={logoutDialog}
          content={
            <div className={styles.dialog}>
              <div className={styles.text}>
                {intl.formatMessage({ id: 'mine.dialog.logout.title' })}
              </div>
              <div className={styles.actions}>
                <span
                  className={styles.cancel}
                  onClick={() => {
                    setLogoutDialog(false);
                  }}
                >
                  {intl.formatMessage({ id: 'mine.dialog.cancel' })}
                </span>
                <span className={styles.confirm} onClick={logout}>
                  {intl.formatMessage({ id: 'mine.dialog.confirm' })}
                </span>
              </div>
            </div>
          }
        />
        <Dialog
          visible={changeNameDialog}
          content={
            <div className={styles.changeNameDialog}>
              <p className={styles.title}>
                {intl.formatMessage({ id: 'mine.dialog.changeName.title' })}
              </p>
              <Input
                placeholder={`${intl.formatMessage({
                  id: 'mine.dialog.changeName.input.placeholder',
                })}`}
                value={nameValue}
                defaultValue={nickName}
                onChange={(val) => {
                  setNameValue(val);
                }}
                className={styles.input}
              />
              <div className={styles.actions}>
                <span
                  className={styles.cancel}
                  onClick={() => {
                    setChangeNameDialog(false);
                    setNameValue(nickName);
                  }}
                >
                  {intl.formatMessage({ id: 'mine.dialog.cancel' })}
                </span>
                <span className={styles.confirm} onClick={changeName}>
                  {intl.formatMessage({ id: 'mine.dialog.confirm' })}
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
