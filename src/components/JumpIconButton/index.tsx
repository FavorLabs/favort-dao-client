import * as React from 'react';
import styles from './index.less';
import { toChat } from '@/utils/util';
import { useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { history } from '@@/core/history';
import newsInBriefImg from '@/assets/img/newsInBrief-img.png';
import videoImg from '@/assets/img/video-img.png';
import groupChatImg from '@/assets/img/groupChat-img.png';
import menuBar from '@/components/ThreeStageLayout/MenuBar';

export type Props = {
  type: number;
  daoId: string;
  daoName?: string;
  address?: string;
};

const JumpIconButton: React.FC<Props> = (props) => {
  const { api, config } = useSelector((state: Models) => state.global);
  // const { userInfo } = useSelector((state: Models) => state.dao);
  const { type, daoId, daoName } = props;

  const jumpPage = (type: number) => {
    if (type === 0) {
      history.push(`/newsletterList/${daoId}`);
    } else if (type === 1) {
      history.push(`/videoList/${daoId}`);
    } else {
      toChat(daoName, api, config?.proxyGroup);
    }
  };

  return (
    <>
      <div className={styles.jumpContent} onClick={() => jumpPage(type)}>
        <div className={styles.imgBox}>
          <img
            src={
              type === 0 ? newsInBriefImg : type === 1 ? videoImg : groupChatImg
            }
            alt=""
            className={styles.img}
          />
        </div>
      </div>
    </>
  );
};

export default JumpIconButton;
