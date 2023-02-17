import React, { useMemo, useRef, useState } from 'react';
import styles from './index.less';

import {
  PictureOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Radio, ConfigProvider } from 'antd';

const { TextArea } = Input;

export type Props = {};

type Img = {
  file: File;
  base64: string;
};
const NewsletterUpload: React.FC<Props> = (props) => {
  const [imgList, setImgList] = useState<Img[]>([]);
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
            placeholder="说说你的伤心事"
            autoSize
            bordered={false}
            maxLength={100}
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
            <EyeOutlined />
          </div>
        </div>
        <div>
          <Button className={styles.post} shape={'round'}>
            Post
          </Button>
        </div>
      </div>
      <div className={styles.img_list}>
        {imgList.map((item, index) => (
          <div className={styles.img_item} key={index}>
            <div className={styles.info}>
              <img src={item.base64} alt={''} />
              <span>{item.file.name}</span>
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

      {false && (
        <div className={styles.visible}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#18a058',
              },
            }}
          >
            <Radio.Group defaultValue={0}>
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
