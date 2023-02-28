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
  Radio,
} from 'antd';

const { TextArea } = Input;
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useSelector, useDispatch } from 'umi';
import Api from '@/services/Api';
import { Models } from '@/declare/modelType';
import { StoreGroup, StorageOverlay } from '@/config/constants';
import { stringToBinary, getProgress } from '@/utils/util';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import imageCompression from 'browser-image-compression';
import ImageCrop from '@/components/ImageCrop';
import TagsEdit from '@/components/TagsEdit';
import { CreatePost } from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import ImageApi from '@/services/tube/Image';

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type UploadResolve = (value: { text: string; overlay: string }) => void;

export type downloadWsResItem = {
  Bitvector: {
    len: number;
    b: string;
  };
  Overlay: string;
  RootCid: string;
};

const UploadVideoModal: React.FC<Props> = (props) => {
  const url = useUrl();
  const resourceUrl = useResourceUrl();
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [statusTip, setStatusTip] = useState<string>('');
  const [submitDisable, setSubmitDisable] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [thumbnailLoading, setThumbnailLoading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    tags: [''],
    thumbnail: '',
    visibility: 0,
    video: '',
  });

  const { api, debugApi, ws, user } = useSelector(
    (state: Models) => state.global,
  );
  const { refreshVideoList } = useSelector((state: Models) => state.manage);

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

    return new Promise((resolve: UploadResolve, reject) => {
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
            ws.on(storageResult, async (res: any) => {
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
          console.log('sendMessage', res.data);
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
            if (err || res?.error) {
              reject(err || res?.error?.message);
              return;
            }
            downloadResult = res?.result;
            ws.emit('download');
          },
        );
      };
      const download = () => {
        console.log('start download');
        downloadTimer = setTimeout(() => {
          downloadFailed();
        }, 1000 * 20);
        ws.on(downloadResult, async (res: downloadWsResItem[]) => {
          console.log('download', res);
          let downloadData = res.find((item) => item.Overlay === overlay);
          if (!downloadData) return;
          setStatusTip('Uploading the file to the P2P storage node');
          // @ts-ignore
          clearTimeout(downloadTimer);
          downloadTimer = setTimeout(() => {
            downloadFailed();
          }, 1000 * 10);
          const p = getProgress(
            stringToBinary(
              downloadData.Bitvector.b,
              downloadData.Bitvector.len,
            ),
            len,
          );
          setProgressValue(p);
          console.log('progress', p);
          if (p === 100) {
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
        const { text, overlay } = await uploadToStorageNode(hash, len);
        message.success(text);
        uploadOverlay = overlay;
        uploadedList[hash] = overlay;
        sessionStorage.setItem('uploaded_list', JSON.stringify(uploadedList));
      }
      setFormData({ ...formData, video: `${hash}?oracles=${uploadOverlay}` });
      setUploaded(true);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
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

  const checkRequired = (value: string) => {
    if (value) setSubmitDisable(false);
    else setSubmitDisable(true);
  };

  const uploadThumbnail = async (file: File) => {
    let fmData = new FormData();
    fmData.append('thumbnail', file);
    const { data } = await ImageApi.upload(resourceUrl, fmData);
    console.log('uploadThumbnail', data);
    setFormData({ ...formData, thumbnail: data.data.token });
  };

  const submit = async () => {
    setSubmitLoading(true);
    try {
      const contents: { content: any; type: number; sort: number }[] = [];
      contents.push({ content: formData.title, type: 1, sort: 0 });
      contents.push({ content: formData.description, type: 2, sort: 0 });
      contents.push({ content: formData.thumbnail, type: 3, sort: 0 });
      contents.push({ content: formData.video, type: 4, sort: 0 });
      const postData: CreatePost = {
        contents: contents,
        dao_id: '63f3500e4698dbe6448ac109',
        tags: formData.tags,
        type: 1,
        users: [],
        visibility: formData.visibility,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        message.success('Submit successfully');
        props.closeModal();
        dispatch({
          type: 'manage/updateState',
          payload: {
            refreshVideoList: !refreshVideoList,
          },
        });
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setSubmitLoading(false);
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
                      checkRequired(e.target.value);
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
                  <TagsEdit
                    setTagsData={(tags) => {
                      setFormData({ ...formData, tags });
                    }}
                  />
                </div>
                <div className={`${styles.videoVisibility} ${styles.item}`}>
                  <p className={styles.label}>Visibility</p>
                  <Radio.Group
                    defaultValue={null}
                    onChange={(e) =>
                      setFormData({ ...formData, visibility: e.target.value })
                    }
                  >
                    {/*<Radio value={0}>Draft</Radio>*/}
                    <Radio value={1}>Public</Radio>
                    <Radio value={2}>Private</Radio>
                  </Radio.Group>
                </div>
                <div className={`${styles.videoThumbnail} ${styles.item}`}>
                  <p className={styles.label}>Thumbnail</p>
                  <div className={styles.cropWrap}>
                    <ImageCrop
                      shape="rect"
                      aspect={2}
                      setImgBase64={(imgBase64) => {
                        setFormData({ ...formData, thumbnail: imgBase64 });
                      }}
                      action={uploadThumbnail}
                    />
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
                    loading={submitLoading}
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
