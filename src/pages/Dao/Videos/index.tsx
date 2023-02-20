import * as React from 'react';
import styles from './index.less';
import ChannelHome from '@/components/ChannelHome';

type Props = {};
const Videos: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.content}>
        <main className={styles.main}>
          <div className={styles.channelInfo}>
            <ChannelHome />
          </div>
        </main>
      </div>
    </>
  );
};

export default Videos;
