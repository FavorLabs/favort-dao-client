import * as React from 'react';
import { ReactNode, useMemo, useState } from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import { Input, NavBar, TextArea } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { LoadingOutlined } from '@ant-design/icons';
import ImageCrop from '@/components/ImageCrop';
import ImageApi from '@/services/tube/Image';
import { message, Spin } from 'antd';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { CreatePost, Post } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';

export type Props = {};
type OptionsItem = {
  name: string;
  content: ReactNode;
};
const PostNewsletter: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');

  // const [title, setTitle] = useState<string>('');
  const [mainText, setMainText] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageListLoading, setImageListLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const { userInfo } = useSelector((state: Models) => state.dao);

  const uploadImage = async (file: File) => {
    setImageListLoading(true);
    try {
      let fmData = new FormData();
      fmData.append('newsletterImage', file);
      const { data } = await ImageApi.upload(imagesResUrl, fmData);
      setImageList([...imageList, data.id]);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setImageListLoading(false);
    }
  };

  const postHandle = async () => {
    if (postLoading) return;
    if (postDisable) return message.info('Please complete the required fields');
    setPostLoading(true);
    try {
      const contents: Post[] = [];
      contents.push({ content: mainText, type: 2, sort: 0 });
      imageList.forEach((item, index) => {
        contents.push({ content: item, type: 3, sort: index });
      });
      const postData: CreatePost = {
        contents: contents,
        dao_id: userInfo?.id as string,
        tags: [],
        type: 0,
        users: [],
        visibility: 1,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        message.success('Post successfully');
        history.goBack();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setPostLoading(false);
    }
  };

  const postDisable = useMemo(() => {
    return !mainText;
  }, [mainText]);

  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const optionsItems: OptionsItem[] = [
    // {
    //   name: 'Title',
    //   content: (
    //     <Input
    //       onChange={(val) => {
    //         setTitle(val);
    //       }}
    //       placeholder="Please enter title"
    //     />
    //   ),
    // },
    {
      name: 'Text',
      content: (
        <TextArea
          placeholder="Please enter main text"
          autoSize={{ minRows: 1, maxRows: 4 }}
          maxLength={500}
          onChange={(val) => {
            setMainText(val.trim());
          }}
        />
      ),
    },
    {
      name: 'Images',
      content: (
        <div className={styles.imageUpload}>
          <ImageCrop
            shape="rect"
            maxCount={9}
            removeImage={() => {
              // setCommunityAvatar('');
            }}
            multiple={true}
            action={uploadImage}
          />
          {imageListLoading && <Spin indicator={loadIcon} size="small" />}
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
        News
      </NavBar>
      <div className={styles.postOptions}>
        {optionsItems.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.key}>{item.name}</div>
            <div className={styles.value}>{item.content}</div>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <div
          className={`${styles.postBtn} ${postDisable && styles.disabled}`}
          onClick={postHandle}
        >
          {postLoading && <span className={styles.loading} />}
          &nbsp;Publish
        </div>
      </div>
    </div>
  );
};

export default PostNewsletter;
