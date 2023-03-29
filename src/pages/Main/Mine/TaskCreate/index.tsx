import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import { Switch, TextArea } from 'antd-mobile';
import { Input } from 'antd';
import favorIcon from '@/assets/icon/favor-icon.svg';
import twitterIcon from '@/assets/icon/twitter-icon.svg';
import youTubeIcon from '@/assets/icon/youtube-icon.svg';
import metaIcon from '@/assets/icon/meta-icon.svg';
import { ReactNode } from 'react';
import { useHistory } from 'umi';

type Props = {};

type requiredList = {
  name: string;
  icon: ReactNode;
};

const TaskCreate: React.FC<Props> = (props) => {
  const history = useHistory();
  const textAreaDefaultValue =
    'The Official Channel for The Most Popular Girls in School! For bookings, press, and all other serious inquiries.';
  const requiredList: requiredList[] = [
    {
      name: 'FavorDAO',
      icon: <img src={favorIcon} alt="" className={styles.image} />,
    },
    {
      name: 'Twitter',
      icon: <img src={twitterIcon} alt="" className={styles.image} />,
    },
    {
      name: 'YouTube',
      icon: <img src={youTubeIcon} alt="" className={styles.image} />,
    },
    {
      name: 'Meta',
      icon: <img src={metaIcon} alt="" className={styles.image} />,
    },
  ];

  return (
    <div className={styles.taskCreate}>
      <TopNavBar title={'Tasks Create'} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.profile}>
            <p className={styles.left}>Task Description</p>
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

          <div className={styles.share}>
            <p className={styles.left}>Link to Share</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.requiredPlatforms}>
            <p className={styles.title}>Required Platforms</p>
            {requiredList.map((item, index) => (
              <div className={styles.row} key={index}>
                <div className={styles.left}>
                  {item.icon}
                  <p className={styles.text}>{item.name}</p>
                </div>
                <div className={styles.right}>
                  <Switch
                    defaultChecked
                    style={{
                      '--checked-color': 'rgba(255, 166, 0, 1)',
                      '--height': '1.375rem',
                      '--width': '2.75rem',
                    }}
                    className={styles.switchButton}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.setting}>
            <p className={styles.title}>Reward setting</p>
            <div className={styles.row}>
              <p className={styles.left}>Total Amount</p>
              <div className={styles.right}>
                <Input className={styles.input} />
                <p className={styles.text}>FavT</p>
              </div>
            </div>
            <div className={styles.row}>
              <p className={styles.left}>Base Price</p>
              <div className={styles.right}>
                <Input className={styles.input} />
                <p className={styles.text}>FavT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.saveButton} onClick={() => history.goBack()}>
        Create
      </div>
    </div>
  );
};

export default TaskCreate;
