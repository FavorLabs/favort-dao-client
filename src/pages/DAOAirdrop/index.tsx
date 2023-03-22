import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useState } from 'react';
import { Switch } from 'antd-mobile';
import { Select, Input } from 'antd';
import type { SelectProps } from 'antd';
import { useHistory } from 'umi';
import DaoSwitch from '@/components/DaoSwitch';

export type Props = {};

const DAOAirdrop: React.FC<Props> = (props) => {
  const history = useHistory();
  const [isAllocation, setIsAllocation] = useState<boolean>(false);
  const [isDistributing, setIsDistributing] = useState<boolean>(false);

  const BlockchainOptions: SelectProps['options'] = [
    {
      label: 'Block chain',
      value: 'Block chain',
    },
    {
      label: 'Blockchain Tecnology ',
      value: 'Blockchain Tecnology ',
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

  const blockchainHandleChange = (value: string[]) => {};

  return (
    <div className={styles.dAOAirdrop}>
      <TopNavBar title={'In DAO Airdrop'} />
      <div className={styles.content}>
        {/*userAttributeSelect*/}
        <div className={styles.userAttributeSelect}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>User Attribute Select</p>
          </div>

          <div className={styles.selectRow}>
            <p className={styles.left}>Tags of DAO</p>

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

          <div className={styles.registerTime}>
            <p className={styles.left}>Register Time</p>

            <div className={styles.right}>
              <div className={styles.inputRow}>
                <p className={styles.text}>Lifetime</p>
                <Input className={styles.input} />
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
              <p className={styles.left}>Amount for airdropping</p>

              <div className={styles.right}>
                <Input className={styles.input} placeholder="please input" />
              </div>
            </div>
          </div>

          <div className={styles.distribution}>
            <div className={styles.row}>
              <p className={styles.left}>Allocation to DAO</p>

              <div className={styles.right}>
                <div className={styles.switch}>
                  <DaoSwitch
                    beforeText={'By Equal'}
                    afterText={'By Active Members'}
                    status={isAllocation}
                    setStatus={setIsAllocation}
                  />
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <p className={styles.left}>Distributing to DAO</p>

              <div className={styles.right}>
                <div className={styles.switch}>
                  <DaoSwitch
                    beforeText={'By Equal'}
                    afterText={'By Random'}
                    status={isDistributing}
                    setStatus={setIsDistributing}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dAOBuilder}>
            <p className={styles.left}>Reward portion of DAO Builder</p>

            <div className={styles.right}>
              <div className={styles.rightInput}>
                <Input className={styles.input} />
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

export default DAOAirdrop;
