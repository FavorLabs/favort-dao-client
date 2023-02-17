import * as React from 'react';
import styles from './index.less';
import { ReactNode } from 'react';
import { Avatar } from 'antd';
import SvgIcon from '@/components/svgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import avatar_1 from '@/assets/img/avatar_1.png';
import latestSvg from '@/assets/icon/latest.svg';
import daoSvg from '@/assets/icon/dao.svg';
import chatSvg from '@/assets/icon/chat.svg';
import mineSvg from '@/assets/icon/mine.svg';

export type Props = {};
export type MenuItem = {
  key: number;
  title: string;
  icon: ReactNode;
  path: string;
};
const Main: React.FC<Props> = (props) => {
  const menuItems: MenuItem[] = [
    {
      key: 1,
      title: 'Latest',
      icon: <SvgIcon svg={latestSvg} />,
      path: '/main/latest',
    },
    {
      key: 2,
      title: 'DAO',
      icon: <SvgIcon svg={daoSvg} />,
      path: '/main/daoList',
    },
    {
      key: 3,
      title: 'Chat',
      icon: <SvgIcon svg={chatSvg} />,
      path: '/main/chat',
    },
    {
      key: 4,
      title: 'Mine',
      icon: <SvgIcon svg={mineSvg} />,
      path: '/main/mine',
    },
  ];

  return (
    <>
      <div className={styles.content}>
        <TopBar
          content={
            <div className={styles.header}>
              <span className={styles.title}>FavorDAO</span>
              <Avatar
                size={40}
                alt=""
                src={avatar_1}
                className={styles.userAvatar}
              />
            </div>
          }
        />
        <Children content={props.children} />
        <MenuBar items={menuItems} />
      </div>
    </>
  );
};

export default Main;
