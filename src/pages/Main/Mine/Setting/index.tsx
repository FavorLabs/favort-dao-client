import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { useState } from 'react';
import settingAvatar from '@/assets/icon/setting-avatar.svg';
import settingArrow from '@/assets/icon/setting-arrow.svg';
import chatChannelsIcon from '@/assets/icon/chatChannels-icon.svg';
import { Switch, TextArea, Radio } from 'antd-mobile';
import { Select, Input } from 'antd';
import type { SelectProps } from 'antd';
import { useHistory } from 'umi';
import DaoSwitch from '@/components/DaoSwitch';

export type Props = {};

const Setting: React.FC<Props> = (props) => {
  const history = useHistory();
  const [isDao, setIsDao] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const textAreaDefaultValue =
    'The Official Channel for The Most Popular ' +
    'Girls in School! For bookings, ' +
    'press, and all other serious ' +
    'inquiries, please contact our ' +
    'management at William Morris Endeavor.';

  const options: SelectProps['options'] = [
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
      label: 'Crypto Adopter',
      value: 'Crypto Adopter',
    },
  ];
  const [twitterValue, setTwitterValue] = useState<string>(
    'hello my name is tom',
  );
  const [youTubeValue, setYouTubeValue] = useState<string>(
    'hello my name is tom',
  );

  const twitterValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTwitterValue(e.target.value);
  };

  const youTubeValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYouTubeValue(e.target.value);
  };

  const handleChange = (value: string[]) => {
    // console.log(`selected ${value}`);
  };

  return (
    <div className={styles.setting}>
      <TopNavBar title={'Setting'} />
      <div className={styles.content}>
        {/*userInfo*/}
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <p className={styles.left}>Avatar</p>
            <div className={styles.right}>
              <img src={settingAvatar} alt="" className={styles.avatarImg} />
              <img src={settingArrow} alt="" className={styles.arrow} />
            </div>
          </div>

          <div className={styles.daoMode}>
            <p className={styles.left}>DAO Mode</p>

            <div className={styles.right}>
              <div className={styles.switch}>
                <DaoSwitch
                  beforeText={'Dao'}
                  afterText={'Club'}
                  status={isDao}
                  setStatus={setIsDao}
                />
              </div>

              <div className={styles.switch}>
                <DaoSwitch
                  beforeText={'Public'}
                  afterText={'Private'}
                  status={isPublic}
                  setStatus={setIsPublic}
                />
              </div>
            </div>
          </div>

          <div className={styles.profile}>
            <p className={styles.left}>Profile</p>

            <div className={styles.right}>
              <TextArea
                placeholder="please enter the content"
                autoSize={{ minRows: 3, maxRows: 6 }}
                defaultValue={textAreaDefaultValue}
                style={{
                  '--color': 'rgba(33, 33, 33, 1)',
                  '--font-size': '1rem',
                }}
              />
            </div>
          </div>

          <div className={styles.tags}>
            <p className={styles.left}>Tags</p>

            <div className={styles.right}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={handleChange}
                options={options}
              />
            </div>
          </div>
        </div>
        {/*contentSync*/}
        <div className={styles.contentSync}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>Content Sync</p>
          </div>

          <div className={styles.blockInput}>
            <p className={styles.left}>Twitter</p>
            <Input
              placeholder="Please enter the content"
              className={styles.input}
              value={twitterValue}
              onChange={twitterValueChange}
            />
          </div>
          <div className={styles.blockInput}>
            <p className={styles.left}>YouTube</p>
            <Input
              placeholder="Please enter the content"
              className={styles.input}
              value={youTubeValue}
              onChange={youTubeValueChange}
            />
          </div>
        </div>
        {/*chatChannels*/}
        <div className={styles.chatChannels}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>ChatChannels</p>
            <div className={styles.right}>Add Channel</div>
          </div>

          <div className={styles.channelBlock}>
            <p className={styles.left}>Main Channel</p>
            <img src={chatChannelsIcon} alt="" className={styles.rightImg} />
          </div>
          <div className={styles.channelBlock}>
            <p className={styles.left}>Product Consultation</p>
            <img src={chatChannelsIcon} alt="" className={styles.rightImg} />
          </div>
          <div className={styles.channelBlock}>
            <p className={styles.left}>Airdrop</p>
            <img src={chatChannelsIcon} alt="" className={styles.rightImg} />
          </div>
        </div>
        {/*membershipSystem*/}
        <div className={styles.membershipSystem}>
          <div className={styles.blockTitle}>
            <p className={styles.left}>Membership System</p>
          </div>
          <div className={styles.systemRadio}>
            <Radio
              className={styles.radioText}
              value="small"
              style={{
                '--icon-size': '0.75rem',
                '--font-size': '1rem',
                '--gap': '0.375rem',
              }}
            >
              Enable Subscription
            </Radio>
          </div>

          <div className={styles.row}>
            <p className={styles.left}>Iron</p>
            <div className={styles.right}>
              <Input className={styles.input} />
              <p className={styles.text}>FavT/M</p>
            </div>
          </div>

          <div className={styles.row}>
            <p className={styles.left}>Brozen</p>
            <div className={styles.right}>
              <Input className={styles.input} />
              <p className={styles.text}>FavT/M</p>
            </div>
          </div>

          <div className={styles.row}>
            <p className={styles.left}>Gold</p>
            <div className={styles.right}>
              <Input className={styles.input} />
              <p className={styles.text}>FavT/M</p>
            </div>
          </div>

          <div className={styles.row}>
            <p className={styles.left}>Platium</p>
            <div className={styles.right}>
              <Input className={styles.input} />
              <p className={styles.text}>FavT/M</p>
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

export default Setting;
