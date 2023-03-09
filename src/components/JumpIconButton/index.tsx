import * as React from 'react';
import styles from './index.less';
import { toChat } from '@/utils/util';
import { useParams, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { history } from '@@/core/history';
import { usePath } from '@/utils/hooks';

export type Props = {
  imgUrl?: string;
  title?: string;
  address?: string;
  // jumpPageMethod?: () => void;
};

const JumpIconButton: React.FC<Props> = (props) => {
  const { api, config } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  // const params = useParams();
  // console.log('params',params)
  const { imgUrl, title, address } = props;

  const jumpPage = (title?: string) => {
    if (title === 'chat') {
      toChat(userInfo?.name, api, config?.proxyGroup);
    } else if (title === 'message') {
      history.push(`/newsletterList/${userInfo?.id}`);
    } else {
      history.push(`/videoList/${userInfo?.id}`);
    }
  };

  return (
    <>
      <div className={styles.jumpContent} onClick={() => jumpPage(title)}>
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="" className={styles.img} />
        </div>
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
};

export default JumpIconButton;
