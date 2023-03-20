import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import addCommunitySvg from '@/assets/icon/addCommunity.svg';
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
import { useUrl, useResourceUrl } from '@/utils/hooks';
import { Tabs, TabBarItemProps, Popup } from 'antd-mobile';
import { isFavorApp, switchTheme } from '@/utils/util';
import DaoApi from '@/services/tube/Dao';
import UserAvatar from '@/components/UserAvatar';
import Flutter from '@/utils/flutter';
import searchImg from '@/assets/icon/search-icon.svg';
import toHomeIcon from '@/assets/icon/toHome.svg';

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
  const { user } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const route = pathname.split('/')[1];
  const [routeKey, setRouteKey] = useState(`/${route}`);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(true);
  const menuItems: MenuItem[] = [
    {
      key: '/latest',
      title: 'Feeds',
      icon: (
        <div className={`${styles.latest} latest`}>
          {routeKey === '/latest' ? (
            <img src={lastetOnIcon}></img>
          ) : (
            <img src={lastetIcon}></img>
          )}
        </div>
      ),
    },
    {
      key: `/daoCommunity`,
      title: 'DAO',
      icon: (
        <div className={`${styles.dao} dao`}>
          {routeKey === '/daoCommunity' ? (
            <img src={daoOnIcon}></img>
          ) : (
            <img src={daoIcon}></img>
          )}
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
          <SvgIcon svg={addCommunitySvg} />
        </div>
      ),
    },
    {
      key: '/chat',
      title: 'Chats',
      icon: (
        <div className={`${styles.chat} chat`}>
          {routeKey === '/chat' ? (
            <img src={chatOnIcon}></img>
          ) : (
            <img src={chatIcon}></img>
          )}
        </div>
      ),
    },
    {
      key: '/mine',
      title: 'My',
      icon: (
        <div className={`${styles.mine} mine`}>
          {routeKey === '/mine' ? (
            <img src={myOnIcon}></img>
          ) : (
            <img src={myIcon}></img>
          )}
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

  const toSearch = () => {
    const type = routeKey.split('/')[1];
    history.push(`/search/${type}`);
  };

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
      <div className={styles.content}>
        <TopBar
          content={
            topBarVisibility && (
              <div className={styles.header}>
                {isFavorApp() && (
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
                      Recommend
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
            )
          }
        />
        <Children content={props.children} />
        <MenuBar
          items={menuItems}
          activeKey={activeKey}
          onChange={(key: string) => {
            if (key === '/addBtn') {
              if (userInfo) setPostPopupVisibility(true);
              else message.info('Please create a community first!');
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
            padding: '20px',
            paddingTop: '0',
            boxSizing: 'border-box',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
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
              <span className={styles.text}>News</span>
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
              <span className={styles.text}>Video</span>
            </div>
          </div>
          <div
            className={styles.cancel}
            onClick={() => {
              setPostPopupVisibility(false);
            }}
          >
            Cancel
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Main;
