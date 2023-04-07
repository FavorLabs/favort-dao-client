import * as React from 'react';
import { ReactNode, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import { Input, NavBar, ProgressCircle, TextArea } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { LoadingOutlined } from '@ant-design/icons';
import ImageCrop from '@/components/ImageCrop';
import ImageApi from '@/services/tube/Image';
import { message, Spin } from 'antd';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { CreatePost, Post } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import { UploadImgType } from '@/config/constants';
import { eventEmitter, getDebounce, sleep } from '@/utils/util';
import { AnimConfig } from '@/declare/global';
import { useIntl } from '@@/plugin-locale/localeExports';
import closeIcon from '@/assets/icon/close-icon.svg';

export type Props = {};

type OptionsItem = {
  name: string;
  content: ReactNode;
};
type ImageList = {
  uid: string;
  value: string;
};
const PostNewsletter: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');
  const intl = useIntl();

  // const [title, setTitle] = useState<string>('');
  const [mainText, setMainText] = useState<string>('');
  const [imageList, setImageList] = useState<ImageList[]>([]);
  const [imageListLoading, setImageListLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const { userInfo } = useSelector((state: Models) => state.dao);

  let animTimer = useRef<null | NodeJS.Timer>(null);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    visible: false,
    tips: `${intl.formatMessage({
      id: 'postNewsletter.animConfig.tips',
    })}`,
    percent: 0,
  });

  const uploadImage = async (option: any) => {
    const { file, onProgress, onError, onSuccess } = option;
    setImageListLoading(true);
    onProgress({ percent: 50 });
    try {
      let fmData = new FormData();
      fmData.append('newsletterImage', file);
      const { data } = await ImageApi.upload(imagesResUrl, fmData);
      setImageList([...imageList, { uid: file.uid, value: data.id }]);
      onSuccess();
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      onError();
    } finally {
      // setImageListLoading(false);
    }
  };

  const disposePercent = (v: AnimConfig): number => {
    if (v.percent < 98) return v.percent + 33;
    else {
      clearInterval(animTimer.current as NodeJS.Timer);
      return v.percent;
    }
  };

  const postHandle = async () => {
    if (postLoading) return;
    if (postDisable)
      return message.warning(
        `${intl.formatMessage({
          id: 'postNewsletter.postBtn.messageWarning',
        })}`,
      );
    setPostLoading(true);
    try {
      const contents: Post[] = [];
      contents.push({ content: mainText, type: 2, sort: 0 });
      imageList.forEach((item, index) => {
        contents.push({ content: item.value, type: 3, sort: index });
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
        setAnimConfig({ ...animConfig, visible: true });
        if (animTimer.current) clearInterval(animTimer.current);
        animTimer.current = setInterval(() => {
          setAnimConfig((v) => ({
            ...v,
            percent: disposePercent(v),
          }));
        }, 200);
        await sleep(2000);
        message.success(
          `${intl.formatMessage({
            id: 'postNewsletter.postBtn.messageSuccess',
          })}`,
        );
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
    return imageListLoading || !mainText;
  }, [mainText, imageListLoading]);

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
      name: `${intl.formatMessage({
        id: 'postNewsletter.option.text',
      })}`,
      content: (
        <TextArea
          placeholder={`${intl.formatMessage({
            id: 'postNewsletter.option.text.placeholder',
          })}`}
          autoSize={{ minRows: 1, maxRows: 4 }}
          maxLength={1000}
          onChange={(val) => {
            setMainText(val.trim());
          }}
        />
      ),
    },
    {
      name: `${intl.formatMessage({
        id: 'postNewsletter.option.images',
      })}`,
      content: (
        <div className={styles.imageUpload}>
          <ImageCrop
            fileType={UploadImgType}
            shape="rect"
            maxCount={9}
            removeImageByUid={(uid) => {
              const res = imageList.filter((item) => item.uid !== uid);
              setImageList(res);
            }}
            changeImgListLoading={(fileList) => {
              setImageListLoading(
                fileList.some((item) => item.status === 'uploading'),
              );
            }}
            multiple={true}
            action={uploadImage}
          />
          {/*{imageListLoading && <Spin indicator={loadIcon} size="small" />}*/}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        backArrow={
          <img src={closeIcon} alt={'closeIcon'} className={styles.closeIcon} />
        }
        onBack={() => {
          history.goBack();
        }}
      >
        {intl.formatMessage({
          id: 'postNewsletter.navBar.title',
        })}
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
          onClick={getDebounce(postHandle)}
        >
          {postLoading && <span className={styles.loading} />}
          &nbsp;
          {intl.formatMessage({
            id: 'postNewsletter.postBtn.text',
          })}
        </div>
      </div>
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

export default PostNewsletter;
