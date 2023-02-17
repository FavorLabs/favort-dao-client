import * as React from 'react';
import styles from './index.less';
import { Button, Avatar, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {
  SearchOutlined,
  AppstoreOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import bannerBg from '@/assets/img/material.jpg';
import ChannelHome from '@/components/ChannelHome';
import SubModal from '@/components/SubModal';
import { useSelector, history } from 'umi';
import { usePath, useUrl, useVerifyChannel } from '@/utils/hooks';
import { isMobile } from '@/utils/util';
import { useEffect, useState } from 'react';
import { Models } from '@/declare/modelType';

type Props = {
  match: {
    params: {
      address: string;
    };
  };
};
const ChannelDetail: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();
  const verifyChannel = useVerifyChannel();
  const isMob = isMobile();

  const { address } = useSelector((state: Models) => state.web3);
  const { channelInfo } = useSelector((state: Models) => state.channel);

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'HOME',
      children: <ChannelHome />,
    },
    {
      key: '2',
      label: `ABOUT`,
      children: (
        <>
          <div className={styles.channelIntroduction}>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
              Introduction:
            </p>
            <p>{channelInfo?.introduction}</p>
          </div>
        </>
      ),
    },
  ];

  const tabChange = (key: string) => {
    // console.log(key);
  };

  return (
    <>
      <div className={styles.content}>
        {/*<header className={'header'}>*/}
        {/*  <div className={styles.topBar}>*/}
        {/*    <div*/}
        {/*      className={styles.logo}*/}
        {/*      onClick={() => {*/}
        {/*        path('');*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      FavorTube*/}
        {/*    </div>*/}
        {/*    <div className={styles.actions}>*/}
        {/*      <Button*/}
        {/*        className={styles.search}*/}
        {/*        type="primary"*/}
        {/*        loading={false}*/}
        {/*        onClick={() => {*/}
        {/*          history.push('/home');*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <span className={styles.actionsText}>Search</span>*/}
        {/*        <SearchOutlined className={styles.actionsIcon} />*/}
        {/*      </Button>*/}
        {/*      {verifyChannel ? (*/}
        {/*        <Button*/}
        {/*          className={styles.manage}*/}
        {/*          type="primary"*/}
        {/*          onClick={() => {*/}
        {/*            path('/manage/');*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <span className={styles.actionsText}>Manage</span>*/}
        {/*          <AppstoreOutlined className={styles.actionsIcon} />*/}
        {/*        </Button>*/}
        {/*      ) : (*/}
        {/*        <Button*/}
        {/*          className={styles.subscribe}*/}
        {/*          type="primary"*/}
        {/*          loading={false}*/}
        {/*          onClick={() => {}}*/}
        {/*        >*/}
        {/*          <span className={styles.actionsText}>Subscribe</span>*/}
        {/*          <WifiOutlined className={styles.actionsIcon} />*/}
        {/*        </Button>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</header>*/}
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(${
              channelInfo?.banner ? channelInfo?.banner : bannerBg
            })`,
          }}
        ></div>
        <main className={styles.main}>
          <div className={styles.channelInfo}>
            <div className={styles.channelOwnerInfo}>
              <Avatar
                className={styles.channelAvatar}
                size={80}
                src={channelInfo?.avatar}
                style={{ backgroundColor: '#F44336', fontSize: '24px' }}
              >
                {channelInfo?.name
                  ? channelInfo?.name?.toUpperCase().substr(0, 1)
                  : 'U'}
              </Avatar>
              <div className={styles.channelDetail}>
                <p className={styles.channelName}>
                  {channelInfo?.name ? channelInfo?.name : 'User'}
                </p>
                <p className={styles.channelAddress}>{channelInfo?.address}</p>
                <span className={styles.subscribers}>0 subscribers</span>
              </div>
            </div>
            <Tabs defaultActiveKey="1" items={tabItems} onChange={tabChange} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ChannelDetail;
