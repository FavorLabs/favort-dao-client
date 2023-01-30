import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  message,
  Modal,
  Upload,
  Input,
  Select,
  Progress,
  Spin,
} from 'antd';
const { TextArea } = Input;
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useSelector } from 'umi';
import Api from '@/services/Api';
import { Models } from '@/declare/modelType';
import { StoreGroup, StorageOverlay } from '@/config/constants';
import { stringToBinary, getProgress } from '@/utils/util';
import { useUrl } from '@/utils/hooks';
import imageCompression from 'browser-image-compression';

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export interface VideoDetail {
  channelId: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  url: string;
  category: string;
  overlay: string;
}
const UploadVideoModal: React.FC<Props> = (props) => {
  const url = useUrl();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [statusTip, setStatusTip] = useState<string>('');
  const [submitDisable, setSubmitDisable] = useState<boolean>(true);
  const [thumbnailLoading, setThumbnailLoading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [formData, setFormData] = useState<VideoDetail>({
    channelId: '63d620d3bb7f2c91bb06bee2',
    title: '',
    description: '',
    tags: [''],
    thumbnail: '',
    url: '',
    category: '',
    overlay: '',
  });
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);

  const { api, debugApi, ws, proxyGroup } = useSelector(
    (state: Models) => state.global,
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const uploadToStorageNode = async (hash: string, len: number) => {
    let connected: string[] = [];
    let bad: any = {};
    let overlay: string;
    let storageResult: string;
    let downloadResult: string;

    let storageTimer: NodeJS.Timer | null = null;
    let downloadTimer: NodeJS.Timer | null = null;
    if (!ws) throw new Error('Websocket not connected');

    return new Promise((resolve, reject) => {
      const downloadFailed = () => {
        bad[overlay] = bad[overlay] ? ++bad[overlay] : 1;
        ws.emit('choiceOverlay');
      };
      const groupSubscribe = () => {
        ws.send(
          {
            id: 1,
            jsonrpc: '2.0',
            method: 'group_subscribe',
            params: ['peers', StoreGroup],
          },
          (err, res) => {
            if (err || res?.error) {
              return reject(err || res?.error?.message);
            }
            if (!res) {
              return reject('JsonPpcResponse is undefined');
            }
            storageResult = res.result;
            console.log('storageResult', storageResult);
            storageTimer = setTimeout(() => {
              reject('Failed to connect to the P2P network');
            }, 1000 * 20);
            // @ts-ignore
            ws.on(storageResult, async (res) => {
              console.log('storageArr', res);
              connected = res.connected ? res.connected : [];
              if (connected.length && storageTimer) {
                clearTimeout(storageTimer);
                storageTimer = null;
                ws.emit('choiceOverlay');
              }
            });
          },
        );
      };
      const choiceOverlay = async () => {
        if (bad[overlay] === 1) {
          try {
            await Api.connect(debugApi, overlay);
          } catch (e) {
            downloadFailed();
            return;
          }
        }
        overlay = connected.filter((item) => bad[item] < 2 || !bad[item])[0];
        console.log('overlay', overlay);
        if (!overlay) {
          reject('Failed to connect to the P2P network');
          return;
        }
        if (downloadResult) setStatusTip('Switching nodes for upload');
        let res = null;
        try {
          res = await Api.sendMessage(api, debugApi, overlay, hash, StoreGroup);
        } catch (e) {
          downloadFailed();
          return;
        }
        let data = JSON.parse(window.atob(res.data.data));
        console.log('message', data);
        const p = getProgress(
          stringToBinary(data.vector.b, data.vector.len),
          len,
        );
        setProgressValue(p);
        console.log('progress', p);
        if (p === 100) {
          resolve({
            text: 'Upload successful',
            overlay,
          });
          return;
        }
        if (!downloadResult) {
          ws.emit('chunkInfoSubscribe');
        }
      };
      const chunkInfoSubscribe = () => {
        ws.send(
          {
            id: 3,
            jsonrpc: '2.0',
            method: 'chunkInfo_subscribe',
            params: ['retrievalProgress', hash],
          },
          (err, res) => {
            console.log('downloadResult', res);
            if (err || res.error) {
              reject(err || res.error.message);
              return;
            }
            downloadResult = res.result;
            ws.emit('download');
          },
        );
      };
      const download = () => {
        console.log('start download');
        downloadTimer = setTimeout(() => {
          downloadFailed();
        }, 1000 * 20);
        // @ts-ignore
        ws.on(downloadResult, async (res) => {
          console.log('download', res);
          let downloadData = res.find((item) => item.Overlay === overlay);
          if (!downloadData) return;
          setStatusTip('Uploading the file to the P2P storage node');
          clearTimeout(downloadTimer);
          downloadTimer = setTimeout(() => {
            downloadFailed();
          }, 1000 * 10);
          setProgressValue(
            getProgress(
              stringToBinary(
                downloadData.Bitvector.b,
                downloadData.Bitvector.len,
              ),
              len,
            ),
          );
          console.log('progress', progressValue);
          if (progressValue === 100) {
            resolve({
              text: 'Upload successful',
              overlay,
            });
          }
        });
      };
      ws.on('groupSubscribe', groupSubscribe);
      ws.on('choiceOverlay', choiceOverlay);
      ws.on('chunkInfoSubscribe', chunkInfoSubscribe);
      ws.on('download', download);
      setStatusTip('Uploading the file to the P2P storage node');
      ws.emit('groupSubscribe');
    }).finally(() => {
      if (storageResult) {
        ws.send(
          {
            id: 1,
            jsonrpc: '2.0',
            method: 'group_unsubscribe',
            params: [storageResult],
          },
          () => {},
        );
      }
      if (downloadResult) {
        ws.send(
          {
            id: 4,
            jsonrpc: '2.0',
            method: 'chunkInfo_unsubscribe',
            params: [downloadResult],
          },
          () => {},
        );
      }
      ws.removeAllListeners('groupSubscribe');
      ws.removeAllListeners('choiceOverlay');
      ws.removeAllListeners('chunkInfoSubscribe');
      ws.removeAllListeners('download');
    });
  };

  const uploadVideo = async (file: RcFile) => {
    console.log('uploadVideo', file);

    // if (file) return;

    try {
      setUploading(true);
      setStatusTip('Uploading the file to local node');
      await Api.observeStorageGroup(api, StoreGroup, [StorageOverlay]);
      let data = await Api.uploadFile(api, file);
      let hash: string = data.data.reference;
      console.log('hash', hash);
      let uploadedList = JSON.parse(
        sessionStorage.getItem('uploaded_list') || '{}',
      );
      let uploadOverlay = uploadedList[hash];
      if (!uploadOverlay) {
        let fileInfo = await Api.getFileInfo(api, hash);
        let len: number = fileInfo.data.list[0].bitVector.len;
        // @ts-ignore
        const { text, overlay } = await uploadToStorageNode(hash, len);
        message.success(text);
        uploadOverlay = overlay;
        uploadedList[hash] = overlay;
        sessionStorage.setItem('uploaded_list', JSON.stringify(uploadedList));
      }
      let video = await Api.uploadVideo(url, hash, uploadOverlay);
      setFormData({ ...formData, url: hash });
      video = video.data.data;
      setFormData({ ...formData, id: video._id });
      setUploaded(true);
    } catch (e: any) {
      message.error(e?.message || e);
    } finally {
      setUploading(false);
    }
  };

  const uploadVideoProps: UploadProps = {
    name: 'file',
    // @ts-ignore
    action: uploadVideo,
    accept: 'video/mp4',
    maxCount: 1,
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
    if (newFileList[0].status === 'uploading') setThumbnailLoading(true);
    else if (newFileList[0].status === 'done') setThumbnailLoading(false);
  };

  const convertThumbnail = async (file: RcFile) => {
    const options = {
      initialQuality: 0.45,
      // alwaysKeepResolution: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      let reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = function () {
        // @ts-ignore
        setFormData({ ...formData, thumbnail: reader.result });
        setSubmitDisable(false);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    const tempData = { ...formData, tags: formData.tags[0].split(',') };
    try {
      const { data } = await Api.createVideo(url, tempData);
      props.closeModal();
    } catch (err: any) {
      message.error(err.message);
    }
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
        destroyOnClose={true}
        onCancel={() => {
          props.closeModal();
        }}
      >
        {uploading ? (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              {progressValue ? (
                <Progress
                  percent={progressValue}
                  showInfo={true}
                  strokeWidth={12}
                />
              ) : (
                <Spin size="large" indicator={antIcon} />
              )}
              <p className={styles.statusTip}>{statusTip}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.modalContent}>
          <p className={styles.title}>Upload Video</p>
          <div style={{ padding: '0 4px' }}>
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
                      setFormData({ ...formData, title: e.target.value });
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
                      setFormData({ ...formData, description: e.target.value });
                    }}
                  />
                </div>
                <div className={`${styles.videoTags} ${styles.item}`}>
                  <p className={styles.label}>Tags</p>
                  <Input
                    className={styles.value}
                    showCount
                    maxLength={100}
                    placeholder="Please enter video tag"
                    onChange={(e) => {
                      setFormData({ ...formData, tags: [e.target.value] });
                    }}
                  />
                </div>
                <div className={`${styles.videoCategory} ${styles.item}`}>
                  <p className={styles.label}>Category</p>
                  <Input
                    className={styles.value}
                    showCount
                    maxLength={100}
                    placeholder="Please enter video category"
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                    }}
                  />
                </div>
                <div className={`${styles.videoThumbnail} ${styles.item}`}>
                  <p className={styles.label}>Thumbnail</p>
                  <div className={styles.cropWrap}>
                    <ImgCrop aspect={2} rotate={true} grid={true}>
                      <Upload
                        accept={'image/png, image/jpeg'}
                        action={convertThumbnail}
                        onChange={thumbnailChange}
                        onPreview={thumbnailPreview}
                        listType="picture-card"
                        fileList={thumbnailFileList}
                      >
                        {thumbnailFileList.length === 0 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                    {thumbnailLoading ? (
                      <Spin size="large" indicator={antIcon} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div className={styles.footer}>
                  <Button
                    className={styles.submit}
                    type="primary"
                    disabled={submitDisable}
                    onClick={submit}
                  >
                    Submit
                  </Button>
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
