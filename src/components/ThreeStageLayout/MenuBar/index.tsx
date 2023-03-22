import * as React from 'react';
import styles from './index.less';
import { MenuItem } from '@/pages/Main';
import { TabBar } from 'antd-mobile';

export type Props = {
  items: MenuItem[];
  activeKey: string;
  onChange: (key: string) => void;
};
const MenuBar: React.FC<Props> = (props) => {
  const { items, activeKey, onChange } = props;

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <TabBar
          className={styles.tabBar}
          activeKey={activeKey}
          onChange={onChange}
          safeArea={true}
        >
          {items.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              className={item.key === '/latest' ? 'Feeds' : ''}
            />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default MenuBar;
