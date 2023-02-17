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
  const verifyChannel = useVerifyChannel();
  const isMob = isMobile();

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

  return (
    <>
      <div className={styles.content}>
        <main className={styles.main}>
          <div className={styles.channelInfo}>
            <Tabs defaultActiveKey="1" items={tabItems} onChange={tabChange} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ChannelDetail;
