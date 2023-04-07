import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState, useMemo } from 'react';
import { message } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import addCommunitySvg from '@/assets/icon/addCommunity.svg';
import unAddCommunityIcon from '@/assets/icon/unAddCommunity.svg';
import homeSvg from '@/assets/icon/home.svg';
import postNews from '@/assets/img/postNews.png';
import postVideo from '@/assets/img/postVideo.png';
import lastetIcon from '@/assets/icon/lastet-icon.svg';
import lastetOnIcon from '@/assets/icon/lastet-on-icon.svg';
import daoIcon from '@/assets/icon/dao-icon.svg';
import daoOnIcon from '@/assets/icon/dao-on-icon.svg';
import chatIcon from '@/assets/icon/chat-icon.svg';
import chatOnIcon from '@/assets/icon/chat-on-icon.svg';
import myIcon from '@/assets/icon/my-icon.svg';
import myOnIcon from '@/assets/icon/my-on-icon.svg';
import {
  useSelector,
  useHistory,
  useDispatch,
  NavLink,
  useIntl,
  getLocale,
  setLocale,
} from 'umi';
import { Models } from '@/declare/modelType';
import { useUrl, useResourceUrl, useClick } from '@/utils/hooks';
import { Tabs, TabBarItemProps, Popup } from 'antd-mobile';
import {
  checkLogin,
  eventEmitter,
  isFavorApp,
  switchTheme,
} from '@/utils/util';
import DaoApi from '@/services/tube/Dao';
import UserAvatar from '@/components/UserAvatar';
import Flutter from '@/utils/flutter';
import searchImg from '@/assets/icon/search-icon.svg';
import toHomeIcon from '@/assets/icon/toHome.svg';
import { history } from '@@/core/history';

export type Props = {};
export type MenuItem = TabBarItemProps & {
  key: string;
};
const Main: React.FC<Props> = (props) => {
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = history.location.pathname;
  const { user, config, settings } = useSelector(
    (state: Models) => state.global,
  );
  const { userInfo } = useSelector((state: Models) => state.dao);
  const route = pathname.split('/')[1];
  const [routeKey, setRouteKey] = useState(`/${route}`);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(true);
  const menuItems: MenuItem[] = [
    {
      key: '/latest',
      title: `${intl.formatMessage({
        id: 'main.menuBar.feeds.text',
      })}`,
      icon: (
        <div className={`${styles.latest}`}>
          <img
            src={routeKey === '/latest' ? lastetOnIcon : lastetIcon}
            alt={''}
          />
        </div>
      ),
    },
    {
      key: `/daoCommunity`,
      title: `${intl.formatMessage({
        id: 'main.menuBar.dao.text',
      })}`,
      icon: (
        <div className={`${styles.dao}`}>
          <img
            src={routeKey === '/daoCommunity' ? daoOnIcon : daoIcon}
            alt={''}
          />
        </div>
      ),
    },
    {
      key: '/addBtn',
      title: '',
      icon: (
        <div
          className={`${styles.addCommunity} addCommunity ${
            userInfo && 'haveCommunity'
          }`}
        >
          <img src={userInfo ? addCommunitySvg : unAddCommunityIcon} alt={''} />
        </div>
      ),
    },
    {
      key: '/chat',
      title: `${intl.formatMessage({
        id: 'main.menuBar.chats.text',
      })}`,
      icon: (
        <div className={`${styles.chat}`}>
          <img src={routeKey === '/chat' ? chatOnIcon : chatIcon} alt={''} />
        </div>
      ),
    },
    {
      key: '/mine',
      title: `${intl.formatMessage({
        id: 'main.menuBar.my.text',
      })}`,
      icon: (
        <div className={`${styles.mine}`}>
          <img src={routeKey === '/mine' ? myOnIcon : myIcon} alt={''} />
        </div>
      ),
    },
  ];
  const [activeKey, setActiveKey] = useState<string>(pathname);
  const [latestNavVisibility, setLatestNavVisibility] =
    useState<boolean>(false);
  const [topBarVisibility, setTopBarVisibility] = useState<boolean>(true);
  const [postPopupVisibility, setPostPopupVisibility] =
    useState<boolean>(false);

  const FeedsClick = useClick(
    () => {
      console.log('click');
    },
    () => {
      console.log('dblclick');
      if (pathname === '/latest/follow') {
        eventEmitter.emit('menuRefreshFollow');
      } else if (pathname === '/latest/recommend') {
        eventEmitter.emit('menuRefreshRecommend');
      }
    },
  );

  const bindDoubleClickHandle = () => {
    const FeedsDom = document.querySelector(
      '.adm-tab-bar-item.Feeds',
    ) as Element;
    FeedsDom.addEventListener('click', () => {
      FeedsClick();
    });
  };

  const toSearch = () => {
    const type = routeKey.split('/')[1];
    history.push(`/search/${type}`);
  };

  useEffect(() => {
    bindDoubleClickHandle();
  }, []);

  useEffect(() => {
    setLatestNavVisibility(pathname.includes('/latest'));
    setTopBarVisibility(!pathname.includes('/mine'));
    setIsShowSearch(!pathname.includes('/chat'));
    const pathKey = `/${pathname.split('/')[1]}`;
    setActiveKey(pathKey);
    setRouteKey(pathKey);
  }, [pathname]);

  return (
    <>
      <div
        className={`${styles.content} ${
          pathname === '/mine' ? styles.mine : ''
        }`}
      >
        {topBarVisibility && (
          <TopBar
            content={
              <div className={styles.header}>
                {isFavorApp(true) && (
                  <span
                    className={styles.toHome}
                    onClick={() => {
                      Flutter.closeWebview();
                    }}
                  >
                    <SvgIcon svg={toHomeIcon} />
                  </span>
                )}
                {latestNavVisibility && (
                  <div className={styles.latestNav}>
                    <NavLink
                      className={styles.navItem}
                      to="/latest/recommend"
                      activeClassName="navSelected"
                    >
                      {intl.formatMessage({
                        id: 'main.latest.header.nav.recommend',
                      })}
                    </NavLink>
                    <NavLink
                      className={styles.navItem}
                      to="/latest/follow"
                      activeClassName="navSelected"
                    >
                      {intl.formatMessage({
                        id: 'main.latest.header.nav.join',
                      })}
                    </NavLink>
                  </div>
                )}
                <div className={styles.action}>
                  {isShowSearch ? (
                    <div
                      className={styles.searchBtn}
                      onClick={() => toSearch()}
                    >
                      <SvgIcon svg={searchImg} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            }
          />
        )}
        <Children content={props.children} />
        <MenuBar
          items={menuItems}
          activeKey={activeKey}
          onChange={(key: string) => {
            if (key === '/addBtn') {
              if (userInfo) setPostPopupVisibility(true);
              else {
                if (checkLogin())
                  message.info(
                    `${intl.formatMessage({
                      id: 'main.menuBar.addBtn.messageInfo',
                    })}`,
                  );
                history.push('/createCommunity');
              }
            } else if (key === '/chat') {
              if (checkLogin()) {
                if (isFavorApp()) {
                  Flutter.clickChat(
                    config?.proxyGroup as string,
                    settings?.Bucket as string,
                  );
                } else {
                  message.warning(
                    `${intl.formatMessage({
                      id: 'main.menuBar.chat.messageWaring',
                    })}`,
                  );
                }
              } else {
                history.push('/mine');
              }
            } else {
              history.push(key);
              setRouteKey(key);
            }
          }}
        />
        <Popup
          visible={postPopupVisibility}
          onMaskClick={() => {
            setPostPopupVisibility(false);
          }}
          bodyStyle={{
            padding: '1.25rem',
            paddingTop: '0',
            boxSizing: 'border-box',
            borderTopLeftRadius: '0.25rem',
            borderTopRightRadius: '0.25rem',
          }}
          className={styles.postPopup}
        >
          <div
            className={styles.postItem}
            onClick={() => {
              setPostPopupVisibility(false);
              history.push('/postNewsletter');
            }}
          >
            <div className={styles.row}>
              <img src={postNews} alt="" className={styles.img} />
              <span className={styles.text}>
                {intl.formatMessage({
                  id: 'main.menuBar.addBtn.news',
                })}
              </span>
            </div>
          </div>
          <div
            className={styles.postItem}
            onClick={() => {
              setPostPopupVisibility(false);
              history.push('/postVideo');
            }}
          >
            <div className={styles.row}>
              <img src={postVideo} alt="" className={styles.img} />
              <span className={styles.text}>
                {intl.formatMessage({
                  id: 'main.menuBar.addBtn.video',
                })}
              </span>
            </div>
          </div>
          <div
            className={styles.cancel}
            onClick={() => {
              setPostPopupVisibility(false);
            }}
          >
            {intl.formatMessage({
              id: 'main.menuBar.addBtn.cancel',
            })}
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Main;
