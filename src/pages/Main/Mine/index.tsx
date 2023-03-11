import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import {
  useHistory,
  useSelector,
  getLocale,
  setLocale,
  getAllLocales,
  useIntl,
  useDispatch,
} from 'umi';
import { Dialog } from 'antd-mobile';
import { Models } from '@/declare/modelType';
import avatar_1 from '@/assets/img/avatar_1.png';
import { omitAddress } from '@/utils/util';
import UserAvatar from '@/components/UserAvatar';
import CopyText from '@/components/CopyText';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { sleep, switchTheme } from '@/utils/util';
import { DaoInfo } from '@/declare/tubeApiType';
import { Popover } from 'antd-mobile';
import { ThemeType } from '@/utils/setTheme';
import { defaultTheme } from '@/config/themeConfig';
import { ConnectType } from '@/config/constants';

export type Props = {};
type SettingItem = {
  key: number;
  name: string;
  content: ReactNode;
};
const Mine: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const intl = useIntl();
  const dispatch = useDispatch();

  const theme = localStorage.getItem('theme');

  const [balance, setBalance] = useState('0');
  const [langMenuVisibility, setLangMenuVisibility] = useState<boolean>(false);
  const [themeType, setThemeType] = useState<ThemeType>(
    (theme as ThemeType) || (defaultTheme as ThemeType),
  );
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const { user } = useSelector((state: Models) => state.global);
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

  const settingItems: SettingItem[] = [
    // {
    //   key: 1,
    //   name: intl.formatMessage({ id: 'main.mine.setting.language' }),
    //   content: (
    //     <div className={styles.langAction}>
    //       <Popover
    //         content={
    //           <div className={styles.languageList}>
    //             {getAllLocales().map((item) => (
    //               <span
    //                 key={item}
    //                 onClick={() => {
    //                   switchLang(item);
    //                 }}
    //               >
    //                 {getLanguageName(item)}
    //               </span>
    //             ))}
    //           </div>
    //         }
    //         trigger="click"
    //         visible={langMenuVisibility}
    //         placement="bottom"
    //       >
    //         <span
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             setLangMenuVisibility(true);
    //           }}
    //         >
    //           {intl.formatMessage({ id: 'main.mine.setting.language-value' })}
    //         </span>
    //       </Popover>
    //     </div>
    //   ),
    // },
    // {
    //   key: 2,
    //   name: intl.formatMessage({ id: 'main.mine.setting.theme' }),
    //   content: (
    //     <div className={styles.themeAction}>
    //       <div
    //         className={styles.switchBtn}
    //         onClick={() => {
    //           switchTheme();
    //           if (isLight) {
    //             setThemeType('dark');
    //           } else {
    //             setThemeType('light');
    //           }
    //         }}
    //       >
    //         <div
    //           className={`${styles.option} ${isLight && 'themeBtnActive'}`}
    //           onClick={(e) => {
    //             isLight && e.stopPropagation();
    //           }}
    //         >
    //           {intl.formatMessage({ id: 'main.mine.setting.theme-light' })}
    //         </div>
    //         <div
    //           className={`${styles.option} ${isDark && 'themeBtnActive'}`}
    //           onClick={(e) => {
    //             isDark && e.stopPropagation();
    //           }}
    //         >
    //           {intl.formatMessage({ id: 'main.mine.setting.theme-dark' })}
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      key: 3,
      name: intl.formatMessage({ id: 'main.mine.setting.about' }),
      content: <div className={styles.aboutAction}>version 1.0</div>,
    },
    {
      key: 4,
      name: intl.formatMessage({ id: 'main.mine.setting.logout' }),
      content: <div className={styles.logoutAction} />,
    },
  ];

  const getBalance = async () => {
    if (!web3) return;
    const b = await web3.eth.getBalance(address);
    if (b) setBalance(web3.utils.fromWei(b, 'ether'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem(ConnectType);
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
    location.reload();
  };

  useEffect(() => {
    if (web3) {
      getBalance();
    }
  }, [web3]);

  return (
    <>
      <div
        className={styles.content}
        onClick={() => {
          setLangMenuVisibility(false);
        }}
      >
        <div className={styles.walletInfo}>
          <div className={styles.walletDetails}>
            {user && (
              <UserAvatar
                className={styles.avatar}
                prefix={avatarsResUrl}
                identifier={user.avatar}
                name={user.nickname}
                size={50}
              />
            )}
            <div className={styles.addressBtn}>
              <span className={styles.address}>{omitAddress(address)}</span>
              <CopyText text={address} />
            </div>
            {/*<div className={styles.balance}>{Number(balance).toFixed(4)}</div>*/}
          </div>
        </div>
        <div className={styles.setting}>
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
