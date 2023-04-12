import * as React from 'react';
import styles from './index.less';
import { useParams, history, useSelector } from 'umi';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { useIntl } from '@@/plugin-locale/localeExports';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Post, PostInfo, ReTransferPost } from '@/declare/tubeApiType';
import PostApi from '@/services/tube/PostApi';
import { message } from 'antd';
import closeIcon from '@/assets/icon/close-icon.svg';
import { NavBar, ProgressCircle, TextArea } from 'antd-mobile';
import { eventEmitter, getContent, getDebounce, sleep } from '@/utils/util';
import { ImageMaxSize } from '@/config/constants';
import { AnimConfig } from '@/declare/global';
import { Models } from '@/declare/modelType';

export type Props = {};

const Quote: React.FC<Props> = (props) => {
  const { postId } = useParams<{ postId: string }>();
  const url = useUrl();
  const intl = useIntl();
  const imagesResUrl = useResourceUrl('images');
  const { userInfo } = useSelector((state: Models) => state.dao);

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [mainText, setMainText] = useState<string>('');
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);
  const [info, setInfo] = useState<Record<number, Post[]>>([]);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  let animTimer = useRef<null | NodeJS.Timer>(null);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    visible: false,
    tips: `${intl.formatMessage({
      id: 'postNewsletter.animConfig.tips',
    })}`,
    percent: 0,
  });

  const postDisable = useMemo(() => {
    return !mainText;
  }, [mainText]);

  const getPostInfo = async () => {
    try {
      const { data } = await PostApi.getPostById(url, postId);
      if (data.data) {
        setPostInfo(data.data);
        setInfo(
          getContent(
            data.data.type === 2 ? data.data.orig_contents : data.data.contents,
          ),
        );
        if (data.data.type === 2) setIsReTransfer(true);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
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
      const postData: ReTransferPost = {
        dao_id: userInfo?.id as string,
        type: 3,
        ref_id: postId,
        ref_type: 0,
        visibility: 1,
        contents: [
          {
            content: mainText,
            type: 2,
            sort: 0,
          },
        ],
      };
      const { data } = await PostApi.reTransferPost(url, postData);
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

  const toDetail = () => {
    if (postInfo) {
      switch (postInfo.type) {
        case 0:
          history.push(`/newsletterDetail/${postInfo.id}`);
          break;
        case 1:
          history.push(`/video/${postInfo.id}`);
          break;
        case 2:
          if (postInfo.ref_type === 0) {
            history.push(`/newsletterDetail/${postInfo.id}`);
          } else {
            history.push(`/video/${postInfo.id}`);
          }
          break;
        case 3:
          if (postInfo.ref_type === 0) {
            history.push(`/newsletterDetail/${postInfo.id}`);
          } else {
            history.push(`/video/${postInfo.id}`);
          }
          break;
        default:
          message.warning(
            `${intl.formatMessage({
              id: 'commentArea.toDetail.messageWaring',
            })}`,
          );
      }
    }
  };

  useEffect(() => {
    if (postId) {
      getPostInfo();
    }
  }, []);

  return (
    <div className={styles.quote}>
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
          id: 'quote.navBar.title',
        })}
      </NavBar>
      <div className={styles.postContent}>
        <div className={styles.textAreaRow}>
          <TextArea
            placeholder={`${intl.formatMessage({
              id: 'quote.textArea.pleaseHolder',
            })}`}
            autoSize={{ minRows: 1, maxRows: 6 }}
            maxLength={1000}
            onChange={(val) => {
              setMainText(val.trim());
            }}
          />
        </div>
        <div
          className={styles.quoteContent}
          // onClick={toDetail}
        >
          <div className={styles.quoteImg}>
            {info[3] && (
              <img
                src={`${imagesResUrl}/${info[3][0]?.content + ImageMaxSize}`}
                alt=""
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.quoteText}>
            <div className={styles.daoName}>
              {postInfo &&
                (isReTransfer
                  ? `@${postInfo.author_dao.name}`
                  : `@${postInfo.dao.name}`)}
            </div>
            <div className={styles.tags}>{postInfo?.tags && <></>}</div>
            <div className={styles.infoTitle}>
              {info[2] && `${info[2][0].content}`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div
          className={`${styles.postBtn} ${postDisable && styles.disabled}`}
          onClick={getDebounce(postHandle)}
        >
          {postLoading && <span className={styles.loading} />}
          &nbsp;
          {intl.formatMessage({
            id: 'quote.postBtn.text',
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

export default Quote;
