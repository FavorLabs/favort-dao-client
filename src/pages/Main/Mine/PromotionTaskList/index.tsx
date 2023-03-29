import * as React from 'react';
import styles from './index.less';
import { JumboTabs } from 'antd-mobile';
import PromotionTask from '@/components/PromotionTask';
import TopNavBar from '@/components/TopNavBar';
import ByMeCard from '@/components/ByMeCard';
import addTaskIcon from '@/assets/icon/addTask-icon.svg';
import { useState } from 'react';
import { useHistory } from 'umi';

export type Props = {};

const PromotionTaskList: React.FC<Props> = (props) => {
  const history = useHistory();
  const [isByMe, setIsByMe] = useState<boolean>(false);

  const handle = (key: string) => {
    if (key === 'ByMe') setIsByMe(true);
    else setIsByMe(false);
  };
  return (
    <div className={styles.pluginForDAOs}>
      <TopNavBar title={'Promotion Tasks'} />
      <JumboTabs className={styles.content} onChange={(key) => handle(key)}>
        <JumboTabs.Tab title="Pending" key="Pending">
          <PromotionTask status={'Pending'} />
          <PromotionTask status={'Pending'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="OnGoing" key="OnGoing">
          <PromotionTask status={'OnGoing'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Finished" key="Finished">
          <PromotionTask status={'Finished'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="ByMe" key="ByMe">
          <ByMeCard />
        </JumboTabs.Tab>
      </JumboTabs>
      {isByMe ? (
        <div
          className={styles.addButton}
          onClick={() => {
            history.push('/taskCreate');
          }}
        >
          <img src={addTaskIcon} alt="" className={styles.image} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromotionTaskList;
