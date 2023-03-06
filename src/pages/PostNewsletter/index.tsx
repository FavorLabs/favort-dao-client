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
const PostNewsletter: React.FC<Props> = (props) => {
  const history = useHistory();
  const imagesResUrl = useResourceUrl('images');

  const [title, setTitle] = useState<string>('');
  const [mainText, setMainText] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);

  const uploadImage = async (file: File) => {
    // try {
    //   let fmData = new FormData();
    //   fmData.append('newsletterImage', file);
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
      name: 'Main text',
      content: (
        <Input
          onChange={(val) => {
            setMainText(val);
          }}
          placeholder="Please enter main text"
        />
      ),
    },
    {
      name: 'Images',
      content: (
        <div className={styles.imageUpload}>
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
        Post Newsletter
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

export default PostNewsletter;
