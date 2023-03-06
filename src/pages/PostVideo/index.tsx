import * as React from 'react';
import { ReactNode, useState } from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { Input, NavBar } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import ImageCrop from '@/components/ImageCrop';
import ImageApi from '@/services/tube/Image';
import { message } from 'antd';
import { useResourceUrl } from '@/utils/hooks';

export type Props = {};
type OptionsItem = {
  name: string;
  content: ReactNode;
};
const PostVideo: React.FC<Props> = (props) => {
  const history = useHistory();
  const imagesResUrl = useResourceUrl('images');

  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const uploadImage = async (file: File) => {
    // try {
    //   let fmData = new FormData();
    //   fmData.append('videoCover', file);
    //   const { data } = await ImageApi.upload(imagesResUrl, fmData);
    //   // setCommunityAvatar(data.id);
    // } catch (e) {
    //   if (e instanceof Error) message.error(e.message);
    // }
  };

  const optionsItems: OptionsItem[] = [
    {
      name: 'Title',
      content: (
        <Input
          onChange={(val) => {
            setTitle(val);
          }}
          placeholder="Please enter title"
        />
      ),
    },
    {
      name: 'Description',
      content: (
        <Input
          onChange={(val) => {
            setDesc(val);
          }}
          placeholder="Please enter description"
        />
      ),
    },
    {
      name: 'Video Cover',
      content: (
        <div className={styles.coverUpload}>
          <ImageCrop
            shape="rect"
            aspect={2}
            removeImage={() => {
              // setCommunityAvatar('');
            }}
            multiple={true}
            action={uploadImage}
          />
        </div>
      ),
    },
    {
      name: 'Video Content',
      content: <div className={styles.videoUpload}></div>,
    },
  ];

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        backArrow={<CloseOutline />}
        onBack={() => {
          history.goBack();
        }}
      >
        Post Video
      </NavBar>
      <div className={styles.postOptions}>
        {optionsItems.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.key}>{item.name}</div>
            <div className={styles.value}>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostVideo;
