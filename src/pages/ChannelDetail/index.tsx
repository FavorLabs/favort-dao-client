import * as React from 'react';
import styles from './index.less';
import { Button, Avatar, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import bannerBg from '@/assets/img/material.jpg';
import ChannelHome from '@/components/ChannelHome';
import { useSelector, history } from 'umi';
import { usePath, useUrl } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import Api from '@/services/Api';
import ProxyApi from '@/services/ProxyApi';
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

  const { channelInfo, address } = useSelector((state: Models) => state.global);

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

  useEffect(() => {
    async function fetch() {
      const data = await ProxyApi.getChannelInfo(
        url,
        props.match.params.address,
      );
      // console.log(data);
    }

    fetch();
  }, []);

  return (
    <>
      <div className={`${styles.content} pageContent`}>
        <header className={'header'}>
          <div className={styles.topBar}>
            <div
              className={styles.logo}
              onClick={() => {
                path('');
              }}
            >
              FavorTube
            </div>
            <div className={styles.actions}>
              <Button
                className={styles.search}
                type="primary"
                loading={false}
                onClick={() => {
                  history.push('/home');
                }}
              >
                Search
              </Button>
              {address.toLowerCase() !== channelInfo?.address?.toLowerCase() ? (
                <Button
                  className={styles.subscribe}
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                >
                  Subscribe
                </Button>
              ) : (
                <Button
                  className={styles.manage}
                  type="primary"
                  onClick={() => {
                    path('/manage/');
                  }}
                >
                  Manage
                </Button>
              )}
            </div>
          </div>
        </header>
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
