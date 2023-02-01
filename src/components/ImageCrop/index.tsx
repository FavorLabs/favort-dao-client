import * as React from 'react';
import styles from './index.less';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { useState } from 'react';

export type Props = {
  url?: string;
  setImgBase64: (imgBase64: string) => void;
  shape?: 'rect' | 'round';
  aspect?: number;
};
const Index: React.FC<Props> = (props) => {
  const { url, setImgBase64, shape, aspect } = props;
  const defaultFileList: UploadFile[] = url
    ? [{ uid: '1', name: '', status: 'done', url: url }]
    : [];
  const [upload, setUpload] = useState<boolean>(!!url);
  // const [imgBase64, setImgBase64] = useState<string>(url);
  const beforeUpload = (file: RcFile) => {
    const render = new FileReader();
    render.onload = () => {
      setImgBase64(render.result as string);
    };
    render.readAsDataURL(file);
    setUpload(true);
    return file;
  };
  const onRemove = () => {
    setImgBase64('');
    setUpload(false);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <>
      <ImgCrop rotate shape={shape} aspect={aspect} key={url}>
        <Upload
          beforeUpload={beforeUpload}
          listType="picture-card"
          onPreview={onPreview}
          onRemove={onRemove}
          maxCount={1}
          defaultFileList={defaultFileList}
        >
          {!upload && 'Upload'}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default Index;
