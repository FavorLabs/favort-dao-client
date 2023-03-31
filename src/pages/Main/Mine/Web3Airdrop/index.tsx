import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useState } from 'react';
import { Switch } from 'antd-mobile';
import { Select, Input } from 'antd';
import type { SelectProps } from 'antd';
import { useHistory } from 'umi';
import DaoSwitch from '@/components/DaoSwitch';
import Prompt from '@/components/Prompt';

export type Props = {};

const Web3Airdrop: React.FC<Props> = (props) => {
  const history = useHistory();
  const [isEqual, setIsEqual] = useState<boolean>(false);

  const BlockchainOptions: SelectProps['options'] = [
    {
      label: 'Ethereum',
      value: 'Ethereum',
    },
    {
      label: 'Polygon',
      value: 'Polygon',
    },
    {
      label: 'BSC',
      value: 'BSC',
    },
  ];

  const Web3Options: SelectProps['options'] = [
    {
      label: 'Block chain',
      value: 'Block chain',
    },
    {
      label: 'Blockchain Tecnology',
      value: 'Blockchain Tecnology',
    },
    {
      label: 'MEME',
      value: 'MEME',
    },
    {
      label: 'NFT',
      value: 'NFT',
    },
  ];

  const blockchainHandleChange = (value: string[]) => {
    // console.log(`selected ${value}`);
  };

  const web3HandleChange = (value: string[]) => {
    // console.log(`selected ${value}`);
  };

  return (
    <div className={styles.web3Airdrop}>
      <TopNavBar title={'Web3 Airdrop'} right={<Prompt />} />
      <div className={styles.content}>
        {/*userAttributeSelect*/}
        <div className={styles.userAttributeSelect}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>User Attribute Select</p>
          </div>

          <div className={styles.selectRow}>
            <p className={styles.left}>Select Blockchain</p>

            <div className={styles.right}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={blockchainHandleChange}
                options={BlockchainOptions}
              />
            </div>
          </div>

          <div className={styles.selectRow}>
            <p className={styles.left}>Portrait of Web3 users</p>

            <div className={styles.right}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={web3HandleChange}
                options={Web3Options}
              />
            </div>
          </div>

          <div className={styles.onChainActivity}>
            <p className={styles.left}>On-chain activity</p>

            <div className={styles.right}>
              <div className={styles.inputRow}>
                <p className={styles.text}>Lifetime</p>
                <Input className={styles.input}></Input>
              </div>
              <div className={styles.inputRow}>
                <p className={styles.text}>Last Month</p>
                <Input className={styles.input}></Input>
              </div>
            </div>
          </div>

          <div className={styles.inDAOActivity}>
            <p className={styles.left}>In-DAO activity</p>

            <div className={styles.right}>
              <div className={styles.inputRow}>
                <p className={styles.text}>Lifetime</p>
                <Input className={styles.input}></Input>
              </div>
              <div className={styles.inputRow}>
                <p className={styles.text}>Last Month</p>
                <Input className={styles.input}></Input>
              </div>
            </div>
          </div>

          <div className={styles.registerTime}>
            <p className={styles.left}>Register Time</p>

            <div className={styles.right}>
              <div className={styles.inputRow}>
                <p className={styles.text}>Lifetime</p>
                <Input className={styles.input}></Input>
              </div>
              <div className={styles.bottom}>
                <div className={styles.button}>Download Allowlist</div>
              </div>
            </div>
          </div>
        </div>

        {/*airdropInformation*/}
        <div className={styles.airdropInformation}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>Airdrop information</p>
          </div>

          <div className={styles.selectTop}>
            <p className={styles.left}>Select Blockchain</p>

            <div className={styles.right}>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={blockchainHandleChange}
                options={BlockchainOptions}
              />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.row}>
              <p className={styles.left}>Contract Address</p>

              <div className={styles.right}>
                <Input className={styles.input} placeholder="please input" />
              </div>
            </div>

            <div className={styles.row}>
              <p className={styles.left}>Tokens for airdropping</p>

              <div className={styles.right}>
                <Input className={styles.input} placeholder="please input" />
              </div>
            </div>
          </div>

          <div className={styles.distribution}>
            <p className={styles.left}>Distribution Method</p>

            <div className={styles.right}>
              <div className={styles.switch}>
                <DaoSwitch
                  beforeText={'Equal'}
                  afterText={'Random'}
                  status={isEqual}
                  setStatus={setIsEqual}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.saveButton} onClick={() => history.goBack()}>
        Save
      </div>
    </div>
  );
};

export default Web3Airdrop;
