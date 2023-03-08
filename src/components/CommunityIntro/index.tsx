import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';

export type Props = {
  post: PostInfo;
};

const CommunityIntro: React.FC<Props> = (props) => {
  const { user } = props.post;
  const communityBackgroundImg =
    'https://img.js.design/assets/img/63fda924b045c20466fc7a43.jpeg#d9b517fc27cf3e514de98ce387eadd7d';
  const communityImg =
    'https://img.js.design/assets/img/63fefe8294031f9157a56c7f.jpeg#42063ac892a1dcf6c98fbfb51a463cd2';
  const title = 'tom';
  const text = 'hello,my name is tom,nice to meet you';
  const handleClick = () => {
    console.log('click button');
  };
  const operate = 'joined';
  return (
    <div className={styles.communityCard}>
      <div
        className={styles.head}
        style={{
          backgroundImage: `url(${communityBackgroundImg})`,
          backgroundSize: `100%`,
          backgroundPosition: `center center`,
        }}
      ></div>

      <div className={styles.foot}>
        <div className={styles.left}>
          <div className={styles.top}>
            <img className={styles.img} src={communityImg} alt="" />
            <p className={styles.title}>{title}</p>
          </div>
          <p className={styles.text}>{user.nickname}</p>
        </div>

        <button className={styles.right} onClick={handleClick}>
          {operate}
        </button>
      </div>
    </div>
  );
};

export default CommunityIntro;
