import * as React from 'react';
import styles from './index.less';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { message, Upload } from 'antd';
import { useState } from 'react';
import addSvg from '@/assets/icon/add.svg';
import SvgIcon from '@/components/SvgIcon';
import { UploadListType } from 'antd/es/upload/interface';
import { UploadImgType } from '@/config/constants';
import _ from 'lodash';

export type Props = {
  crop?: boolean;
  url?: string;
  maxCount?: number;
  setImgBase64?: (imgBase64: string) => void;
  removeImage?: () => void;
  removeImageByUid?: (uid: string) => void;
  changeImgListLoading?: (imageList: UploadFile<any>[]) => void;
  fileType: string;
  shape?: 'rect' | 'round';
  aspect?: number;
  multiple?: boolean;
  listType?: UploadListType;
  action?: (item: any) => any;
};
const Index: React.FC<Props> = (props) => {
  const {
    crop = false,
    url,
    maxCount,
    setImgBase64,
    removeImage,
    removeImageByUid,
    changeImgListLoading,
    fileType,
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
  const [fileCount, setFileCount] = useState<number>(0);

  const beforeUpload = (file: RcFile) => {
    const render = new FileReader();
    render.onload = () => {
      setImgBase64?.(render.result as string);
    };
    render.readAsDataURL(file);
    setUpload(true);
    if (_.indexOf(UploadImgType.split(', '), file.type) !== -1) {
    } else {
      message.warning('Please select the correct image file!');
    }
    return file;
  };

  const onRemove = (file: UploadFile) => {
    setImgBase64?.('');
    removeImage?.();
    removeImageByUid?.(file.uid);
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

  const onChange = (info: UploadChangeParam) => {
    const { file, fileList } = info;
    setFileCount(fileList.length);
    changeImgListLoading?.(fileList);
  };

  const uploadDOM = (
    <Upload
      accept={fileType}
      beforeUpload={beforeUpload}
      listType={listType || 'picture-card'}
      onPreview={onPreview}
      onRemove={onRemove}
      onChange={onChange}
      maxCount={multiple ? undefined : 1}
      // action={action || undefined}
      customRequest={action}
      defaultFileList={defaultFileList}
    >
      {multiple
        ? maxCount && fileCount < maxCount && <SvgIcon svg={addSvg} />
        : !upload && <SvgIcon svg={addSvg} />}
    </Upload>
  );

  return (
    <>
      {crop ? (
        <ImgCrop
          rotationSlider={true}
          cropShape={shape}
          aspect={aspect}
          modalTitle={'Edit image'}
          key={url}
        >
          {uploadDOM}
        </ImgCrop>
      ) : (
        uploadDOM
      )}
    </>
  );
};

export default Index;
