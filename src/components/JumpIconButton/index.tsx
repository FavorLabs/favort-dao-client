import * as React from 'react';
import styles from './index.less';
import { toChat } from '@/utils/util';
import { useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { history } from 'umi';
import SvgIcon from '@/components/SvgIcon';
import newsImg from '@/assets/icon/daoNews.svg';
import videoImg from '@/assets/icon/daoVideo.svg';
import chatImg from '@/assets/icon/daoChat.svg';

export type Props = {
  type: number;
  daoId: string;
  daoName?: string;
};

const JumpIconButton: React.FC<Props> = (props) => {
  const { api, config } = useSelector((state: Models) => state.global);
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
          <SvgIcon
            svg={type === 0 ? newsImg : type === 1 ? videoImg : chatImg}
          />
        </div>
      </div>
    </>
  );
};

export default JumpIconButton;
