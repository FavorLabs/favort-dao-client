import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { Avatar } from 'antd';
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
import { switchTheme } from '@/utils/util';
import DaoApi from '@/services/tube/Dao';

export type Props = {};
export type MenuItem = TabBarItemProps & {
  key: string;
};
const Main: React.FC<Props> = (props) => {
  const url = useUrl();
  const resourceUrl = useResourceUrl('avatars');
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = history.location.pathname;
  const { user } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const menuItems: MenuItem[] = [
    {
      key: '/latest',
      title: 'Latest',
      icon: (
        <div className={`${styles.latest} latest`}>
          <SvgIcon svg={latestSvg} />
        </div>
      ),
    },
    {
      key: `/dao/${userInfo?.id}`,
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
      title: 'Chat',
      icon: (
        <div className={`${styles.chat} chat`}>
          <SvgIcon svg={chatSvg} />
        </div>
      ),
    },
    {
      key: '/mine',
      title: 'Mine',
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
  }, [pathname]);

  return (
    <>
      <div className={styles.content}>
        <TopBar
          content={
            topBarVisibility ? (
              <div className={styles.header}>
                {latestNavVisibility && (
                  <div className={styles.latestNav}>
                    <NavLink
                      className={styles.navItem}
                      to="/latest/follow"
                      activeClassName="navSelected"
                    >
                      {intl.formatMessage({
                        id: 'main.latest.header.nav.follow',
                      })}
                    </NavLink>
                    <NavLink
                      className={styles.navItem}
                      to="/latest/recommend"
                      activeClassName="navSelected"
                    >
                      recommend
                    </NavLink>
                    <span
                      style={{ background: '#ccc', padding: '0 6px' }}
                      onClick={() => {
                        if (getLocale() === 'en-US') {
                          setLocale('zh-CN', false);
                        } else {
                          setLocale('en-US', false);
                        }
                      }}
                    >
                      lang
                    </span>
                    &nbsp;
                    <span
                      style={{ background: '#ccc', padding: '0 6px' }}
                      onClick={switchTheme}
                    >
                      theme
                    </span>
                  </div>
                )}
                <div className={styles.action}>
                  <SearchOutline className={styles.searchBtn} />
                  <Avatar
                    size={16}
                    alt=""
                    src={user?.avatar && resourceUrl + '/' + user?.avatar}
                    className={styles.userAvatar}
                  />
                </div>
              </div>
            ) : (
              <></>
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
            } else {
              setActiveKey(key);
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
            Post newsletter
          </div>
          <div
            className={styles.postItem}
            onClick={() => {
              setPostPopupVisibility(false);
              history.push('/postVideo');
            }}
          >
            Post video
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Main;
