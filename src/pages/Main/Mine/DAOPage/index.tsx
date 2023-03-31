import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useHistory } from 'umi';
import addTaskIcon from '@/assets/icon/addTask-icon.svg';
import CustomSwiper, { LaminatedCard } from '@/components/CustomSwiper';
import Web3Card from '@/components/Web3Card';
import DaoCard from '@/components/DaoCard';
import Prompt from '@/components/Prompt';

type Props = {};

const DAOPage: React.FC<Props> = (props) => {
  const history = useHistory();

  const daoList: LaminatedCard[] = [
    {
      key: 1,
      content: <DaoCard />,
    },
    {
      key: 2,
      content: <DaoCard />,
    },
    {
      key: 3,
      content: <DaoCard />,
    },
  ];

  return (
    <div className={styles.web3Page}>
      <TopNavBar title={'DAO Airdrop'} right={<Prompt />} />
      <div className={styles.content}>
        <CustomSwiper items={daoList} spacing={10} />
      </div>

      <div
        className={styles.addButton}
        onClick={() => {
          history.push('/dAOAirdrop');
        }}
      >
        <img src={addTaskIcon} alt="" className={styles.image} />
      </div>
    </div>
  );
};

export default DAOPage;
