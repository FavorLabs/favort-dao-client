import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useHistory } from 'umi';
import addTaskIcon from '@/assets/icon/addTask-icon.svg';
import Web3Card from '@/components/Web3Card';
import CustomSwiper, { LaminatedCard } from '@/components/CustomSwiper';
import ByMeCard from '@/components/ByMeCard';

type Props = {};

const Web3Page: React.FC<Props> = (props) => {
  const history = useHistory();

  const web3List: LaminatedCard[] = [
    {
      key: 1,
      content: <Web3Card />,
    },
    {
      key: 2,
      content: <Web3Card />,
    },
    {
      key: 3,
      content: <Web3Card />,
    },
  ];

  return (
    <div className={styles.web3Page}>
      <TopNavBar title={'Web3 Airdrop'} />
      <div className={styles.content}>
        <CustomSwiper items={web3List} spacing={10} />
      </div>

      <div
        className={styles.addButton}
        onClick={() => {
          history.push('/web3Airdrop');
        }}
      >
        <img src={addTaskIcon} alt="" className={styles.image} />
      </div>
    </div>
  );
};

export default Web3Page;
