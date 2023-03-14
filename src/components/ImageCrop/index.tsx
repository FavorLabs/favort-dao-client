import * as React from 'react';
import styles from './index.less';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { useState } from 'react';
import addSvg from '@/assets/icon/add.svg';
import SvgIcon from '@/components/SvgIcon';
import { UploadListType } from 'antd/es/upload/interface';

export type Props = {
  url?: string;
  setImgBase64?: (imgBase64: string) => void;
  removeImage: () => void;
  shape?: 'rect' | 'round';
  aspect?: number;
  multiple?: boolean;
  listType?: UploadListType;
  action?: (item: any) => any;
};
const Index: React.FC<Props> = (props) => {
  const {
    url,
    setImgBase64,
    removeImage,
    shape,
    aspect,
    multiple,
    listType,
    action,
  } = props;
  const defaultFileList: UploadFile[] = url
    ? [{ uid: '1', name: '', status: 'done', url: url }]
    : [];
  const [upload, setUpload] = useState<boolean>(!!url);
  // const [imgBase64, setImgBase64] = useState<string>(url);
  const beforeUpload = (file: RcFile) => {
    const render = new FileReader();
    render.onload = () => {
      setImgBase64?.(render.result as string);
    };
    render.readAsDataURL(file);
    setUpload(true);
    return file;
  };
  const onRemove = () => {
    setImgBase64?.('');
    removeImage();
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
          listType={listType || 'picture-card'}
          onPreview={onPreview}
          onRemove={onRemove}
          maxCount={multiple ? undefined : 1}
          action={action || undefined}
          defaultFileList={defaultFileList}
        >
          {multiple ? (
            <SvgIcon svg={addSvg} />
          ) : (
            !upload && <SvgIcon svg={addSvg} />
          )}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default Index;
