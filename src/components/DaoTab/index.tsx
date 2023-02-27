import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { Tabs, Swiper } from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import Dynamics from '@/pages/Dao/Dynamics';
import Newsletter from '@/pages/Dao/Newsletter';
import Videos from '@/pages/Dao/Videos';
import Group from '@/pages/Dao/Group';
import { history, useParams } from 'umi';

export type Props = {
  activeTab: number | null;
};
const DaoTab: React.FC<Props> = (props) => {
  const params = useParams<{ id: string }>();
  const { activeTab } = props;
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(activeTab || 0);

  const tabItems = [
    {
      key: 'dynamics',
      title: 'dynamics',
      component: <Dynamics />,
    },
    {
      key: 'newsletter',
      title: 'newsletter',
      component: <Newsletter />,
    },
    {
      key: 'videos',
      title: 'videos',
      component: <Videos />,
    },
    {
      key: 'group',
      title: 'group',
      component: <Group />,
    },
  ];

  return (
    <div className={styles.content}>
      <Tabs
        activeKey={tabItems[activeIndex].key}
        onChange={(key) => {
          const index = tabItems.findIndex((item) => item.key === key);
          history.push(`/dao/${params.id}?tabIndex=${index}`);
          setActiveIndex(index);
          swiperRef.current?.swipeTo(index);
        }}
      >
        {tabItems.map((item) => (
          <Tabs.Tab destroyOnClose={true} title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction="horizontal"
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
        }}
        className={styles.tabContent}
      >
        {tabItems.map((item, index) => (
          <Swiper.Item key={item.key} className={styles.tabItem}>
            {/*{item.component}*/}
            {activeIndex == index ? item.component : <></>}
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
};

export default DaoTab;
