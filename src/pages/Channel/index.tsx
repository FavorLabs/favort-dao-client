import * as React from 'react';
import styles from './index.less';
import { Button, Avatar, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import bannerBg from '@/assets/img/material.jpg';
import ChannelHome from '@/components/ChannelHome';
import { useHistory } from 'umi';

export type Props = {};
const Channel: React.FC<Props> = (props) => {
  const history = useHistory();

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'HOME',
      children: <ChannelHome />,
    },
    {
      key: '2',
      label: `ABOUT`,
      children: `Content of Tab Pane 2`,
    },
  ];

  const tabChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <div className={styles.content}>
        <header>
          <div className={styles.topBar}>
            <div className={styles.logo}>FavorTube</div>
            <div className={styles.actions}>
              <Button
                className={styles.subscribe}
                type="primary"
                loading={false}
                onClick={() => {}}
              >
                Subscribe
              </Button>
              <Button
                className={styles.manage}
                type="primary"
                onClick={() => {
                  history.push('/manage');
                }}
              >
                Manage
              </Button>
            </div>
          </div>
        </header>
        <div
          className={styles.banner}
          style={{ backgroundImage: `url(${bannerBg})` }}
        ></div>
        <main className={styles.main}>
          <div className={styles.channelInfo}>
            <div className={styles.channelOwnerInfo}>
              <Avatar
                className={styles.channelAvatar}
                size={80}
                style={{ backgroundColor: '#F44336', fontSize: '24px' }}
              >
                U
              </Avatar>
              <div className={styles.channelDetail}>
                <p className={styles.channelName}>User</p>
                <p className={styles.channelAddress}>
                  0xE28E429D3616Bb77Bee108FF943030B3311b4Ec3
                </p>
                <span className={styles.subscribers}>10 subscribers</span>
              </div>
            </div>
            <Tabs defaultActiveKey="1" items={tabItems} onChange={tabChange} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Channel;
