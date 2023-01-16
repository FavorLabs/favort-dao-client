import * as React from 'react';
import { useState } from 'react';
import styles from './index.less';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, Upload, Input, Select } from 'antd';
const { TextArea } = Input;
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
const UploadVideoModal: React.FC<Props> = (props) => {
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [uploadVideoLoading, setUploadVideoLoading] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDesc, setVideoDesc] = useState<string>('');
  const [videoVisibility, setVideoVisibility] = useState<string>('');
  const [videoCategory, setVideoCategory] = useState<string>('');
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);

  const uploadVideoProps: UploadProps = {
    name: 'file',
    action: '',
    accept: 'video/mp4',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadVideo = () => {
    setUploadVideoLoading(true);
    setTimeout(() => {
      setUploadVideoLoading(false);
      props.closeModal();
    }, 2000);
  };

  const thumbnailPreview = async (file: UploadFile) => {
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

  const thumbnailChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setThumbnailFileList(newFileList);
  };

  return (
    <>
      <Modal
        title={null}
        footer={null}
        centered
        maskClosable={false}
        className={styles.uploadVideoModal}
        open={props.open}
        onCancel={() => {
          props.closeModal();
        }}
      >
        <div className={styles.modalContent}>
          <p className={styles.title}>Upload Video</p>
          <div>
            <Divider style={{ margin: '16px 0' }} />
            {!uploaded ? (
              <div className={styles.uploadVideoFile}>
                <Upload
                  {...uploadVideoProps}
                  className={styles.uploadContainer}
                >
                  <div className={styles.selectContainer}>
                    <div className={styles.uploadSelectBtn}>
                      <UploadOutlined className={styles.uploadIcon} />
                    </div>
                    <Button className={styles.uploadSelectText} type="text">
                      SELECT FILE
                    </Button>
                  </div>
                </Upload>
                <div className={styles.uploadInstructions}>
                  <p>
                    By submitting your videos to FavorTube, you acknowledge that
                    you agree to FavorTube's Terms of Service and Community
                    Guidelines. Please be sure not to violate others' copyright
                    or privacy rights. Learn more
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.uploadVideoDetail}>
                <div className={`${styles.subTitle} ${styles.item}`}>
                  <p className={styles.label}>Details</p>
                </div>
                <div className={`${styles.videoTitle} ${styles.item}`}>
                  <p className={styles.label}>Title</p>
                  <Input
                    className={styles.value}
                    showCount
                    maxLength={100}
                    placeholder="Please enter video title"
                    onChange={(e) => {
                      setVideoTitle(e.target.value);
                    }}
                  />
                </div>
                <div className={`${styles.videoDesc} ${styles.item}`}>
                  <p className={styles.label}>Description</p>
                  <TextArea
                    allowClear
                    showCount
                    maxLength={5000}
                    autoSize={{ minRows: 2, maxRows: 5 }}
                    placeholder="Please enter channel description"
                    onChange={(e) => {
                      setVideoDesc(e.target.value);
                    }}
                  />
                </div>
                <div className={`${styles.videoVisibility} ${styles.item}`}>
                  <p className={styles.label}>Visibility</p>
                  <Select
                    defaultValue=""
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      setVideoVisibility(value);
                    }}
                    options={[
                      {
                        value: 'public',
                        label: 'Public',
                      },
                      {
                        value: 'member',
                        label: 'Member',
                      },
                      {
                        value: 'private',
                        label: 'Private',
                      },
                    ]}
                  />
                </div>
                <div className={`${styles.videoCategory} ${styles.item}`}>
                  <p className={styles.label}>Category</p>
                  <Select
                    defaultValue=""
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      setVideoCategory(value);
                    }}
                    options={[
                      {
                        value: 'people',
                        label: 'People',
                      },
                    ]}
                  />
                </div>
                <div className={`${styles.videoThumbnail} ${styles.item}`}>
                  <p className={styles.label}>Thumbnail</p>
                  <ImgCrop aspect={2} rotate={true} grid={true}>
                    <Upload
                      accept={'image/png, image/jpeg'}
                      onChange={thumbnailChange}
                      onPreview={thumbnailPreview}
                      listType="picture-card"
                      fileList={thumbnailFileList}
                    >
                      {thumbnailFileList.length === 0 && '+ Upload'}
                    </Upload>
                  </ImgCrop>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadVideoModal;
