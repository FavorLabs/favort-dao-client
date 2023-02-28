import * as React from 'react';
import styles from './index.less';
import { ReactNode } from 'react';
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
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { useResourceUrl } from '@/utils/hooks';

export type Props = {};
export type MenuItem = {
  key: number;
  title: string;
  icon: ReactNode;
  path: string;
};
const Main: React.FC<Props> = (props) => {
  const resourceUrl = useResourceUrl();
  const { user } = useSelector((state: Models) => state.global);
  const menuItems: MenuItem[] = [
    {
      key: 1,
      title: 'Latest',
      icon: <SvgIcon svg={latestSvg} />,
      path: '/latest',
    },
    {
      key: 2,
      title: 'DAO',
      icon: <SvgIcon svg={daoSvg} />,
      path: '/daoList',
    },
    {
      key: 3,
      title: 'Chat',
      icon: <SvgIcon svg={chatSvg} />,
      path: '/chat',
    },
    {
      key: 4,
      title: 'Mine',
      icon: <SvgIcon svg={mineSvg} />,
      path: '/mine',
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
                size={32}
                alt=""
                src={user?.avatar && resourceUrl + '/' + user?.avatar}
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
