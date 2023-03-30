import * as React from 'react';
import { ReactNode, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import { message, Spin, Upload } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload/interface';
import { Input, NavBar, ProgressCircle, TextArea } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { LoadingOutlined } from '@ant-design/icons';
import ImageCrop from '@/components/ImageCrop';
import SvgIcon from '@/components/SvgIcon';
import ImageApi from '@/services/tube/Image';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import {
  eventEmitter,
  getProgress,
  getSize,
  sleep,
  stringToBinary,
} from '@/utils/util';
import addSvg from '@/assets/icon/add.svg';
import Api from '@/services/Api';
import { Models } from '@/declare/modelType';
import { CreatePost, Post } from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import { UploadImgType } from '@/config/constants';
import { AnimConfig } from '@/declare/global';

export type Props = {};
type OptionsItem = {
  name: string;
  content: ReactNode;
};
type UploadResolve = (value: { text: string; overlay: string }) => void;
type downloadWsResItem = {
  Bitvector: {
    len: number;
    b: string;
  };
  Overlay: string;
  RootCid: string;
};

const PostVideo: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');

  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [videoCover, setVideoCover] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [videoCoverLoading, setVideoCoverLoading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [statusTip, setStatusTip] = useState<string>('');
  const [showVideoList, setShowVideoList] = useState<boolean>(true);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const { api, debugApi, ws, config } = useSelector(
    (state: Models) => state.global,
  );
  const { userInfo } = useSelector((state: Models) => state.dao);

  let animTimer = useRef<null | NodeJS.Timer>(null);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    visible: false,
    tips: 'In progress...',
    percent: 0,
  });

  const disposePercent = (v: AnimConfig): number => {
    if (v.percent < 98) return v.percent + 33;
    else {
      clearInterval(animTimer.current as NodeJS.Timer);
      return v.percent;
    }
  };

  const uploadImage = async (option: any) => {
    const { file, onProgress, onError, onSuccess } = option;
    setVideoCoverLoading(true);
    onProgress({ percent: 50 });
    try {
      let fmData = new FormData();
      fmData.append('videoCover', file);
      const { data } = await ImageApi.upload(imagesResUrl, fmData);
      setVideoCover(data.id);
      onSuccess();
    } catch (e) {
      if (e instanceof Error)
        // message.error(e.message);
        onError();
    } finally {
      setVideoCoverLoading(false);
    }
  };

  const uploadToStorageNode = async (hash: string, len: number) => {
    if (!config) return;
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
            params: ['peers', config.storeGroup],
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
          res = await Api.sendMessage(
            api,
            debugApi,
            overlay,
            hash,
            config.storeGroup,
          );
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
          }, 1000 * 20);
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

  const checkVideoSize = (file: RcFile, fileList: RcFile) => {
    console.log('checkVideoSize', file);
    if (file.type !== 'video/mp4') {
      message.warning('Please select mp4 file!');
      setShowVideoList(false);
      return false;
    }
    if (config?.videoLimitSize && file.size / 1024 > config.videoLimitSize) {
      setShowVideoList(false);
      message.warning(`Video needs to be less than ${getSize(307200, 1)}`);
      return false;
    } else {
      setShowVideoList(true);
    }
  };

  const uploadVideo = async (option: { file: RcFile }) => {
    console.log('uploadVideo', option.file);
    if (!config) return;
    try {
      setUploading(true);
      setStatusTip('Uploading the file to local node');
      await Api.observeStorageGroup(api, config.storeGroup, config.storeNodes);
      let data = await Api.uploadFile(api, option.file);
      let hash: string = data.data.reference;
      console.log('hash', hash);
      let uploadedList = JSON.parse(
        sessionStorage.getItem('uploaded_list') || '{}',
      );
      let uploadOverlay = uploadedList[hash];
      console.log('uploadOverlay', uploadOverlay);
      if (!uploadOverlay) {
        let fileInfo = await Api.getFileInfo(api, hash);
        let len: number = fileInfo.data.list[0].bitVector.len;
        // @ts-ignore
        const { text, overlay } = await uploadToStorageNode(hash, len);
        message.success(text);
        uploadOverlay = overlay;
        uploadedList[hash] = overlay;
        sessionStorage.setItem('uploaded_list', JSON.stringify(uploadedList));
      } else {
        message.success('Upload successful');
      }
      setVideo(`${hash}?oracles=${uploadOverlay}`);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      else message.error(e);
      setVideo('');
      setShowVideoList(false);
    } finally {
      setProgressValue(0);
      setUploading(false);
    }
  };

  const postHandle = async () => {
    if (postLoading) return;
    if (postDisable) return message.info('Please complete the required fields');
    setPostLoading(true);
    try {
      const contents: Post[] = [];
      contents.push({ content: title, type: 1, sort: 0 });
      contents.push({ content: desc, type: 2, sort: 0 });
      contents.push({ content: videoCover, type: 3, sort: 0 });
      contents.push({ content: video, type: 4, sort: 0 });
      const postData: CreatePost = {
        contents: contents,
        dao_id: userInfo?.id as string,
        tags: [],
        type: 1,
        users: [],
        visibility: 1,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        setAnimConfig({ ...animConfig, visible: true });
        if (animTimer.current) clearInterval(animTimer.current);
        animTimer.current = setInterval(() => {
          setAnimConfig((v) => ({
            ...v,
            percent: disposePercent(v),
          }));
        }, 200);
        await sleep(2000);
        message.success('Post successfully');
        eventEmitter.emit('menuRefreshRecommend');
        setAnimConfig({ ...animConfig, percent: 100, visible: false });
        history.push('/latest/recommend');
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setAnimConfig({ ...animConfig, visible: false });
      setPostLoading(false);
    }
  };

  const postDisable = useMemo(() => {
    return !(title && videoCover && video);
  }, [title, videoCover, video]);

  const uploadVideoProps: UploadProps = {
    name: 'file',
    // @ts-ignore
    beforeUpload: checkVideoSize,
    // @ts-ignore
    customRequest: uploadVideo,
    accept: 'video/mp4',
    maxCount: 1,
    showUploadList: showVideoList,
    onRemove: () => {
      setVideo('');
    },
  };

  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const optionsItems: OptionsItem[] = [
    {
      name: 'Title',
      content: (
        <Input
          onChange={(val) => {
            setTitle(val.trim());
          }}
          maxLength={100}
          placeholder="Please enter title"
        />
      ),
    },
    {
      name: 'Description',
      content: (
        <TextArea
          placeholder="Please enter description"
          autoSize={{ minRows: 1, maxRows: 4 }}
          maxLength={300}
          onChange={(val) => {
            setDesc(val.trim());
          }}
        />
      ),
    },
    {
      name: 'Thumbnail',
      content: (
        <div className={styles.coverUpload}>
          <ImageCrop
            fileType={UploadImgType}
            crop={true}
            shape="rect"
            aspect={2}
            removeImage={() => {
              setVideoCover('');
            }}
            action={uploadImage}
          />
          {/*{videoCoverLoading && <Spin indicator={loadIcon} size="small" />}*/}
        </div>
      ),
    },
    {
      name: 'Video',
      content: (
        <div className={`${styles.videoUpload} videoUpload`}>
          <Upload {...uploadVideoProps} className={styles.uploadContainer}>
            <div className={styles.selectContainer}>
              <div className={styles.uploadSelectBtn}>
                <SvgIcon svg={addSvg} />
              </div>
            </div>
          </Upload>
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
        Post Video
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
      {uploading && (
        <div className={styles.uploadVideoOverlay}>
          <div className={styles.circleBox}>
            <ProgressCircle percent={progressValue} className={styles.circle}>
              <span className={styles.percent}>
                {Math.floor(progressValue)}%
              </span>
            </ProgressCircle>
          </div>
          <p className={styles.tips}>{statusTip}</p>
        </div>
      )}
      {animConfig.visible && (
        <div className={styles.createOverlay}>
          <div className={styles.circleBox}>
            <ProgressCircle
              percent={animConfig.percent}
              className={styles.circle}
            >
              <span className={styles.percent}>{animConfig.percent}%</span>
            </ProgressCircle>
          </div>
          <p className={styles.tips}>{animConfig.tips}</p>
        </div>
      )}
    </div>
  );
};

export default PostVideo;
