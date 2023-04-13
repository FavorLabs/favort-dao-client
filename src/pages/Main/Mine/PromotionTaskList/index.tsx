import * as React from 'react';
import styles from './index.less';
import { JumboTabs } from 'antd-mobile';
import PromotionTask from '@/components/PromotionTask';
import TopNavBar from '@/components/TopNavBar';
import ByMeCard from '@/components/ByMeCard';
import addTaskIcon from '@/assets/icon/addTask-icon.svg';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'umi';
import CustomSwiper, { LaminatedCard } from '@/components/CustomSwiper';
import Prompt from '@/components/Prompt';

export type Props = {};

const PromotionTaskList: React.FC<Props> = (props) => {
  const history = useHistory();
  const params: { keyValue?: string } = useParams();
  const [isByMe, setIsByMe] = useState<boolean>(false);

  const byMeList: LaminatedCard[] = [
    {
      key: 1,
      content: <ByMeCard />,
    },
    {
      key: 2,
      content: <ByMeCard />,
    },
    {
      key: 3,
      content: <ByMeCard />,
    },
  ];

  const handle = (key: string) => {
    if (key === 'ByMe') setIsByMe(true);
    else setIsByMe(false);
  };

  useEffect(() => {
    if (params.keyValue === 'ByMe') setIsByMe(true);
    else setIsByMe(false);
  }, [params.keyValue]);

  return (
    <div className={styles.pluginForDAOs}>
      <TopNavBar title={'Promotion Tasks'} right={<Prompt />} />
      <JumboTabs
        className={`${styles.content} jumboTabsContent`}
        onChange={(key) => handle(key)}
        defaultActiveKey={params.keyValue}
      >
        <JumboTabs.Tab title="Pending" key="Pending" description={null}>
          <PromotionTask status={'Pending'} />
          <PromotionTask status={'Pending'} />
          <PromotionTask status={'Pending'} />
          <PromotionTask status={'Pending'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="OnGoing" key="OnGoing" description={null}>
          <PromotionTask status={'OnGoing'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Finished" key="Finished" description={null}>
          <PromotionTask status={'Finished'} />
        </JumboTabs.Tab>
        <JumboTabs.Tab title="ByMe" key="ByMe" description={null}>
          <CustomSwiper items={byMeList} spacing={10} />
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
