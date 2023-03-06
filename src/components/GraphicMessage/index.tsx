import * as React from 'react';
import styles from './index.less';
import { Avatar, Image } from 'antd';
import lookOver from '@/assets/img/look_over.png';
import commentOn from '@/assets/img/comment_on.png';
import support from '@/assets/img/support.png';

export type Props = {
  userImg?: string;
};

const GraphicMessage: React.FC<Props> = (props) => {
  const { userImg } = props;
  const imgUrlArr = [
    {
      name: 'img1',
      url: 'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca',
    },
    {
      name: 'img2',
      url: 'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca',
    },
    {
      name: 'img3',
      url: 'https://img.js.design/assets/img/63feebab9d2376d02eccbaf7.jpg#7b6f740e4ff20b3a5645a0e598ea9bca',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.inContent}>
        <div className={styles.userInfo}>
          <Avatar src={userImg} className={styles.userImg}></Avatar>
          <div className={styles.userText}>
            <p className={styles.userName}>FavorDao</p>
            <p className={styles.releaseTime}>today 08:23</p>
          </div>
        </div>

        <div className={styles.textInfo}>
          为了更好地支持新的 APP 测试， 我们决定在本周日关闭 Metis 和 OKC
          测试网络并结束空投活动。
          所有空投奖励预计将于3月15日发放完毕。感谢您的热情和支持！
        </div>

        <div className={styles.mediumInfo}>
          {imgUrlArr.map((item, index) => (
            <Image src={item.url} className={styles.imgUrl} key={index} />
          ))}
        </div>

        <div className={styles.operate}>
          <div className={styles.operateDiv}>
            <img src={lookOver} className={styles.operateIcon} />
            <span className={styles.operateText}>123</span>
          </div>
          <div className={styles.operateDiv}>
            <img src={commentOn} className={styles.operateIcon} />
            <span className={styles.operateText}>123</span>
          </div>
          <div className={styles.operateDiv}>
            <img src={support} className={styles.operateIcon} />
            <span className={styles.operateText}>123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicMessage;
