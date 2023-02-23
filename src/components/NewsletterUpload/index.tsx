import React, { useMemo, useRef, useState } from 'react';
import styles from './index.less';

import {
  PictureOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Radio, ConfigProvider, Popover, message } from 'antd';

const { TextArea } = Input;
import PostApi from '@/services/tube/PostApi';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { CreatePost, Post } from '@/declare/tubeApiType';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import ImageApi from '@/services/tube/Image';

export type Props = {};

type Img = {
  file: File;
  base64: string;
};
const NewsletterUpload: React.FC<Props> = (props) => {
  const url = useUrl();
  const resourceUrl = useResourceUrl();

  const [text, setText] = useState<string>('');
  const [eye, setEye] = useState(false);
  const [status, setStatus] = useState(0);
  const [imgList, setImgList] = useState<Img[]>([]);
  const [visibility, setVisibility] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);

  const { address } = useSelector((state: Models) => state.web3);
  const { info } = useSelector((state: Models) => state.dao);

  const inputImg = async (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    const newFile = e.target.files[0];
    const reader = new FileReader();
    await new Promise((s) => {
      reader.addEventListener(
        'load',
        function () {
          s(undefined);
        },
        false,
      );
      reader.readAsDataURL(newFile);
    });
    setImgList([
      ...imgList,
      {
        base64: reader.result as string,
        file: newFile,
      },
    ]);
  };
  const deleteImg = (i: number) => {
    let list = imgList.slice();
    list.splice(i, 1);
    setImgList(list);
  };

  const init = () => {
    setText('');
    setImgList([]);
  };

  const uploadImg = async () => {
    let imgKeyArr = [];
    for (let i = 0; i < imgList.length; i++) {
      const item = imgList[i];
      const formData = new FormData();
      formData.append(item.file.name, item.file);
      const { data } = await ImageApi.upload(resourceUrl, formData);
      imgKeyArr.push(data.id);
    }
    return imgKeyArr;
  };

  // const postTextData = (): Post => {
  //   return {content: text, type: 1, sort: 0};
  // };
  //
  // const postImgData = (): Post[] => {
  //   return imgList.map((item, index) => {
  //     return {content: item.file, type: 2, sort: index};
  //   });
  // };
  //
  // const postTagsData = (): string[] => {
  //   return [];
  // };

  const uploadNewsletter = async () => {
    try {
      const imgIdArr = await uploadImg();
      const contents: { content: any; type: number; sort: number }[] = [];
      contents.push(
        ...imgIdArr.map((item) => ({ content: item, type: 3, sort: 0 })),
      );
      contents.push({ content: text, type: 1, sort: 1 });
      const postData: CreatePost = {
        contents: contents,
        dao_id: info?.address,
        tags,
        type: 0,
        users: [],
        visibility,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        message.success('Send successfully');
      }
      init();
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  const selectVisibilityDOM = () => (
    <div className={styles.selectVisibility}>
      <Radio.Group
        defaultValue={1}
        onChange={(e) => setVisibility(e.target.value)}
      >
        {/*<Radio value={0}>Draft</Radio>*/}
        <Radio value={1}>Public</Radio>
        <Radio value={2}>Private</Radio>
      </Radio.Group>
    </div>
  );

  return (
    <div className={styles.card}>
      <header>
        <div className={styles.avatar}>
          <img
            src={'https://assets.paopao.info/public/avatar/default/clara.png'}
            alt={'avatar'}
          />
        </div>
        <div className={styles.text}>
          <TextArea
            placeholder="Please enter your content"
            autoSize
            bordered={false}
            maxLength={100}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </header>
      <div className={styles.fun}>
        <div className={styles.icon}>
          <div>
            <label>
              <input
                type="file"
                accept=""
                style={{ display: 'none' }}
                onInput={inputImg}
                key={imgList.length}
              />
              <PictureOutlined />
            </label>
          </div>
          <div>
            <Popover
              placement="bottom"
              title={null}
              content={selectVisibilityDOM}
              trigger="click"
            >
              <EyeOutlined />
            </Popover>
            {/*<EyeOutlined onClick={() => setEye(!eye)} />*/}
          </div>
        </div>
        <div>
          <Button
            className={styles.post}
            shape={'round'}
            onClick={uploadNewsletter}
          >
            Post
          </Button>
        </div>
      </div>
      <div className={styles.img_list}>
        {imgList.map((item, index) => (
          <div className={styles.img_item} key={index}>
            <div className={styles.info}>
              <img src={item.base64} alt={''} />
              {/*<span>{item.file.name}</span>*/}
            </div>
            <DeleteOutlined
              className={styles.del}
              onClick={() => {
                deleteImg(index);
              }}
            />
          </div>
        ))}
      </div>

      {eye && (
        <div className={styles.visible}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#18a058',
              },
            }}
          >
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <Radio value={0}>Public</Radio>
              <Radio value={1}>Private</Radio>
            </Radio.Group>
          </ConfigProvider>
        </div>
      )}
    </div>
  );
};

export default NewsletterUpload;
