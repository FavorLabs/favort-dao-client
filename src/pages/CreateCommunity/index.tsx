import * as React from 'react';
import { useMemo, useState, useRef, ReactNode } from 'react';
import styles from './index.less';
import { NavBar, Input, ProgressCircle } from 'antd-mobile';
import ImageCrop from '@/components/ImageCrop';
import { useHistory, useDispatch } from 'umi';
import ImageApi from '@/services/tube/Image';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { message } from 'antd';
import DaoApi from '@/services/tube/Dao';
import { sleep } from '@/utils/util';

export type Props = {};
type AnimConfig = {
  visible: boolean;
  tips: string;
  percent: number;
};
type OptionsItem = {
  name: string;
  content: ReactNode;
};

const CreateCommunity: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');

  const [communityName, setCommunityName] = useState<string>('');
  const [communityDesc, setCommunityDesc] = useState<string>('');
  const [communityAvatar, setCommunityAvatar] = useState<string>('');
  const [communityBanner, setCommunityBanner] = useState<string>('');
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    visible: false,
    tips: 'In progress...',
    percent: 0,
  });

  let animTimer = useRef<null | NodeJS.Timer>(null);

  const uploadAvatar = async (file: File) => {
    try {
      let fmData = new FormData();
      fmData.append('avatar', file);
      const { data } = await ImageApi.upload(avatarsResUrl, fmData);
      setCommunityAvatar(data.id);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const uploadBanner = async (file: File) => {
    try {
      let fmData = new FormData();
      fmData.append('banner', file);
      const { data } = await ImageApi.upload(imagesResUrl, fmData);
      setCommunityBanner(data.id);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const createHandle = async () => {
    if (createDisable) return message.info('Please complete all options');
    // setAnimConfig({...animConfig, visible: true});
    // if (animTimer.current) clearInterval(animTimer.current);
    // animTimer.current = setInterval(() => {
    //   if (animConfig.percent < 100) {
    //     console.log(animConfig.percent);
    //     setAnimConfig({...animConfig, percent: animConfig.percent + 2});
    //   } else {
    //     clearInterval(animTimer.current as NodeJS.Timer);
    //   }
    // }, 1500);
    // await sleep(5000);
    try {
      const { data } = await DaoApi.create(url, {
        name: communityName,
        introduction: communityDesc,
        avatar: communityAvatar,
        banner: communityBanner,
      });
      if (data.code === 0) {
        dispatch({
          type: 'dao/updateState',
          payload: {
            userInfo: data.data,
          },
        });
        history.goBack();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      // setAnimConfig({...animConfig, visible: false});
      // clearInterval(animTimer.current);
    }
  };

  const createDisable = useMemo(() => {
    return !(
      communityName &&
      communityDesc &&
      communityAvatar &&
      communityBanner
    );
  }, [communityName, communityDesc, communityAvatar, communityBanner]);

  const optionsItems: OptionsItem[] = [
    {
      name: 'Name',
      content: (
        <Input
          onChange={(val) => {
            setCommunityName(val);
          }}
          placeholder="Please enter community name"
        />
      ),
    },
    {
      name: 'Description',
      content: (
        <Input
          onChange={(val) => {
            setCommunityDesc(val);
          }}
          placeholder="Please enter community description"
        />
      ),
    },
    {
      name: 'Avatar',
      content: (
        <div className={styles.avatarUpload}>
          <ImageCrop
            shape="round"
            aspect={1}
            removeImage={() => {
              setCommunityAvatar('');
            }}
            action={uploadAvatar}
          />
        </div>
      ),
    },
    {
      name: 'Banner',
      content: (
        <div className={styles.bannerUpload}>
          <ImageCrop
            shape="rect"
            aspect={2}
            removeImage={() => {
              setCommunityBanner('');
            }}
            action={uploadBanner}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        Create community
      </NavBar>
      <div className={styles.createOptions}>
        {optionsItems.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.key}>{item.name}</div>
            <div className={styles.value}>{item.content}</div>
          </div>
        ))}
      </div>
      <div
        className={`${styles.createBtn} ${createDisable && styles.disabled}`}
        onClick={createHandle}
      >
        Create Now
      </div>
      {animConfig.visible && (
        <div className={styles.createOverlay}>
          <div className={styles.circleBox}>
            <ProgressCircle
              percent={animConfig.percent}
              className={styles.circle}
            >
              <span className={styles.percent}>{animConfig.percent}%</span>
            </ProgressCircle>
          </div>
          <p className={styles.tips}>{animConfig.tips}</p>
        </div>
      )}
    </div>
  );
};

export default CreateCommunity;
