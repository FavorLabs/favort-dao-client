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
import chatSvg from '@/assets/icon/chat.svg';
import mineSvg from '@/assets/icon/mine.svg';
import {
  useSelector,
  useHistory,
  NavLink,
  useIntl,
  getLocale,
  setLocale,
} from 'umi';
import { Models } from '@/declare/modelType';
import { useResourceUrl } from '@/utils/hooks';
import { Tabs, TabBarItemProps } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { switchTheme } from '@/utils/util';

export type Props = {};
export type MenuItem = TabBarItemProps & {
  key: string;
};
const Main: React.FC<Props> = (props) => {
  const resourceUrl = useResourceUrl();
  const history = useHistory();
  const intl = useIntl();
  const { user } = useSelector((state: Models) => state.global);
  const menuItems: MenuItem[] = [
    {
      key: '/latest',
      title: 'Latest',
      icon: <SvgIcon svg={latestSvg} />,
    },
    {
      key: '/daoList',
      title: 'DAO',
      icon: <SvgIcon svg={daoSvg} />,
    },
    {
      key: '/addBtn',
      title: '',
      icon: '+',
    },
    {
      key: '/chat',
      title: 'Chat',
      icon: <SvgIcon svg={chatSvg} />,
    },
    {
      key: '/mine',
      title: 'Mine',
      icon: <SvgIcon svg={mineSvg} />,
    },
  ];
  const [activeKey, setActiveKey] = useState<string>(menuItems[0].key);
  const [latestNavVisibility, setLatestNavVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    setLatestNavVisibility(history.location.pathname.includes('/latest'));
  }, [history.location.pathname]);

  return (
    <>
      <div className={styles.content}>
        <TopBar
          content={
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
          }
        />
        <Children content={props.children} />
        <MenuBar
          items={menuItems}
          activeKey={activeKey}
          onChange={(key: string) => {
            if (key === '/addBtn') {
              //
            } else {
              setActiveKey(key);
              history.push(key);
            }
          }}
        />
      </div>
    </>
  );
};

export default Main;
