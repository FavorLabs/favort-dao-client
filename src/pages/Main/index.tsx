import * as React from 'react';
import styles from './index.less';
import { ReactNode, useState } from 'react';
import { Avatar } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import avatar_1 from '@/assets/img/avatar_1.png';
import latestSvg from '@/assets/icon/latest.svg';
import daoSvg from '@/assets/icon/dao.svg';
import mineSvg from '@/assets/icon/mine.svg';
import { useSelector, useHistory } from 'umi';
import { Models } from '@/declare/modelType';
import { useResourceUrl } from '@/utils/hooks';
import { Tabs, TabBarItemProps } from 'antd-mobile';

export type Props = {};
export type MenuItem = TabBarItemProps & {
  key: string;
};
const Main: React.FC<Props> = (props) => {
  const resourceUrl = useResourceUrl();
  const history = useHistory();
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
      key: '/mine',
      title: 'Mine',
      icon: <SvgIcon svg={mineSvg} />,
    },
  ];
  const [activeKey, setActiveKey] = useState(menuItems[0].key);

  return (
    <>
      <div className={styles.content}>
        <TopBar
          content={
            <div className={styles.header}>
              {/*<span className={styles.title}>FavorDAO</span>*/}
              {/*<Avatar*/}
              {/*  size={32}*/}
              {/*  alt=""*/}
              {/*  src={user?.avatar && resourceUrl + '/' + user?.avatar}*/}
              {/*  className={styles.userAvatar}*/}
              {/*/>*/}
              <div className="latestNav"></div>
            </div>
          }
        />
        <Children content={props.children} />
        <MenuBar
          items={menuItems}
          activeKey={activeKey}
          onChange={(key: string) => {
            setActiveKey(key);
            history.push(key);
          }}
        />
      </div>
    </>
  );
};

export default Main;
