import * as React from 'react';
import styles from './index.less';
import { Input } from 'antd';
import { JumboTabs } from 'antd-mobile';
import ByMeList from '@/components/ByMeList';

type Props = {};

const ByMeCard: React.FC<Props> = (props) => {
  const acceptedList: any = [
    {
      title: 'Accepted by aaa',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'Accepted by bbb',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'Accepted by ccc',
      date: '2022/10/19 13:52:48',
    },
  ];

  const submittedList: any = [
    {
      title: 'Submitted by aaa',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'Submitted by bbb',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'Submitted by ccc',
      date: '2022/10/19 13:52:48',
    },
  ];

  const finishedList: any = [
    {
      title: 'aaa has finished the task',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'bbb has finished the task',
      date: '2022/10/19 13:52:48',
    },
    {
      title: 'ccc has finished the task',
      date: '2022/10/19 13:52:48',
    },
  ];

  return (
    <div className={styles.ByMeCard}>
      <div className={styles.taskStatus}>
        <p className={styles.title}>Task Status</p>
        <div className={styles.block}>
          <p className={styles.left}>Acceptted by</p>
          <div className={styles.right}>
            <div className={styles.rLeft}>
              <p className={styles.blue}>123</p>
              <p className={styles.text}>DAOs</p>
            </div>
            <div className={styles.button}>Details</div>
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.left}>Accomplished by</p>
          <div className={styles.right}>
            <div className={styles.rLeft}>
              <p className={styles.blue}>123</p>
              <p className={styles.text}>DAOs</p>
            </div>
            <div className={styles.button}>Details</div>
          </div>
        </div>
        <div className={styles.share}>
          <p className={styles.left}>Link to Share</p>
          <div className={styles.right}>
            <Input className={styles.input} placeholder="please input" />
          </div>
        </div>
      </div>

      <div className={styles.taskAmount}>
        <div className={styles.block}>
          <p className={styles.text}>Total</p>
          <p className={styles.amount}>500,000</p>
        </div>
        <div className={styles.block}>
          <p className={styles.text}>Rewarded</p>
          <p className={styles.amount}>500,000</p>
        </div>
        <div className={styles.block}>
          <p className={styles.text}>Pending</p>
          <p className={styles.amount}>500,000</p>
        </div>
        <div className={styles.block}>
          <p className={styles.text}>Remains</p>
          <p className={styles.amount}>500,000</p>
        </div>
      </div>

      <div className={styles.pendingText}>
        <p className={styles.title}>Pending for confirmation</p>
      </div>

      <div className={styles.tab}>
        <JumboTabs>
          <JumboTabs.Tab title="Accepted" key="Accepted">
            <ByMeList list={acceptedList} />
          </JumboTabs.Tab>
          <JumboTabs.Tab title="Submitted" key="Submitted">
            <ByMeList list={submittedList} isSubmit={true} />
          </JumboTabs.Tab>
          <JumboTabs.Tab title="Finished" key="Finished">
            <ByMeList list={finishedList} />
          </JumboTabs.Tab>
        </JumboTabs>
      </div>
    </div>
  );
};

export default ByMeCard;
