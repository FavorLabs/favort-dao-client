import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { MenuItem } from '@/pages/Main';
import { usePath } from '@/utils/hooks';
import classNames from 'classnames';
import * as trace_events from 'trace_events';

export type Props = {
  items: MenuItem[];
  pathHook?: boolean;
};
const MenuBar: React.FC<Props> = (props) => {
  const history = useHistory();
  const path = usePath();
  const { items, pathHook = false } = props;

  const isActive = (path: string) => {
    return pathHook
      ? history.location.pathname.includes(path)
      : history.location.pathname === path;
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {items.map((item) => (
          <div
            className={classNames({
              [styles.menuItem]: true,
              [styles.active]: isActive(item.path),
            })}
            key={item.key}
            onClick={() => {
              pathHook ? path(item.path) : history.push(item.path);
            }}
          >
            <span className={`${styles.icon}`}>{item.icon}</span>
            <span className={styles.title}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
