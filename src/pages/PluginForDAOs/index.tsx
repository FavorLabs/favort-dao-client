import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import PluginDao from '@/components/PluginDao';
import { NavBar } from 'antd-mobile';
import Prompt from '@/components/Prompt';
import { ReactNode } from 'react';
import noticeIcon from '@/assets/icon/noticeIcon.svg';
import langLive3 from '@/assets/icon/langLive-3-icon.svg';
import strawPoll5 from '@/assets/icon/strawPoll-5-icon.svg';
import gameWorld from '@/assets/icon/gameWorld-icon.svg';
import shopeeIcon from '@/assets/icon/shopee-icon.svg';

export type Props = {};

type listItems = {
  icon: ReactNode;
  title: string;
  text: string;
};

const PluginForDAOs: React.FC<Props> = (props) => {
  const history = useHistory();

  const listItems = [
    {
      icon: <img src={noticeIcon} alt="" />,
      title: 'AMA！',
      text: 'Enable you to call Voice AMA in you DAO',
    },
    {
      icon: <img src={langLive3} alt="" />,
      title: 'Lang live 3！',
      text: 'Live broadcast to you members',
    },
    {
      icon: <img src={strawPoll5} alt="" />,
      title: 'StrawPoll 5',
      text: 'Add a poll action to your groupChat',
    },
    {
      icon: <img src={gameWorld} alt="" />,
      title: 'Game World',
      text: 'Add in-page games in the community',
    },
    {
      icon: <img src={shopeeIcon} alt="" />,
      title: 'Shopee',
      text: 'Add e-commerce shop to you DAO',
    },
  ];

  return (
    <div className={styles.pluginForDAOs}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
        right={
          <div className={styles.navRight}>
            <Prompt />
          </div>
        }
      >
        Plugin for DAOs
      </NavBar>
      <div className={styles.content}>
        {listItems.map((item: any) => {
          return (
            <PluginDao icon={item.icon} title={item.title} text={item.text} />
          );
        })}
      </div>
    </div>
  );
};

export default PluginForDAOs;
