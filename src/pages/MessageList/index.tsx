import * as React from 'react';
import styles from './index.less';
import GraphicMessage from '@/components/GraphicMessage';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';

export type Props = {};

const MessageList: React.FC<Props> = () => {
  const history = useHistory();
  const userImg =
    'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a';

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        news in brief
      </NavBar>

      <GraphicMessage
        userImg={userImg}
        watchNum={456}
        commentOnNum={123}
        likeNum={121983}
      />
      <GraphicMessage
        userImg={userImg}
        watchNum={456}
        commentOnNum={123}
        likeNum={121983}
      />
      <GraphicMessage
        userImg={userImg}
        watchNum={456}
        commentOnNum={123}
        likeNum={121983}
      />
    </div>
  );
};

export default MessageList;
