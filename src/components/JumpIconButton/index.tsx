import * as React from 'react';
import styles from './index.less';
import { toChat } from '@/utils/util';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { history } from '@@/core/history';

export type Props = {
  imgUrl?: string;
  title?: string;
  address?: string;
  // jumpPageMethod?: () => void;
};

const JumpIconButton: React.FC<Props> = (props) => {
  const { api, config } = useSelector((state: Models) => state.global);
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { imgUrl, title, address } = props;

  const jumpPage = (title?: string) => {
    if (title === 'chat') {
      toChat(userInfo?.name, api, config?.proxyGroup);
    } else if (title === 'message') {
      history.push(`/messageList/${userInfo?.id}`);
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
