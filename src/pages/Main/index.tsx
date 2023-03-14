import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import avatar_1 from '@/assets/img/avatar_1.png';
import latestSvg from '@/assets/icon/latest.svg';
import daoSvg from '@/assets/icon/dao.svg';
import addCommunitySvg from '@/assets/icon/addCommunity.svg';
import chatSvg from '@/assets/icon/chat.svg';
import mineSvg from '@/assets/icon/mine.svg';
import homeSvg from '@/assets/icon/home.svg';
import postNews from '@/assets/img/postNews.png';
import postVideo from '@/assets/img/postVideo.png';
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
import { SearchOutline } from 'antd-mobile-icons';
import { isFavorApp, switchTheme } from '@/utils/util';
import DaoApi from '@/services/tube/Dao';
import UserAvatar from '@/components/UserAvatar';
import Flutter from '@/utils/flutter';
import deleteImg from '@/assets/img/delete-icon.png';

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
  const menuItems: MenuItem[] = [
    {
      key: '/latest',
      title: 'News',
      icon: (
        <div className={`${styles.latest} latest`}>
          <SvgIcon svg={latestSvg} />
        </div>
      ),
    },
    {
      key: `/dao`,
      title: 'DAO',
      icon: (
        <div className={`${styles.dao} dao`}>
          <SvgIcon svg={daoSvg} />
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
          <SvgIcon svg={chatSvg} />
        </div>
      ),
    },
    {
      key: '/mine',
      title: 'My',
      icon: (
        <div className={`${styles.mine} mine`}>
          <SvgIcon svg={mineSvg} />
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

  useEffect(() => {
    setLatestNavVisibility(pathname.includes('/latest'));
    setTopBarVisibility(!pathname.includes('/mine'));
    const pathKey = `/${pathname.split('/')[1]}`;
    setActiveKey(pathKey);
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
                    <SvgIcon svg={homeSvg} />
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
                  <SearchOutline className={styles.searchBtn} />
                  <div className={styles.avatar}>
                    {user && (
                      <UserAvatar
                        prefix={avatarsResUrl}
                        name={user.nickname}
                        identifier={user.avatar}
                        size={25}
                      />
                    )}
                  </div>
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
