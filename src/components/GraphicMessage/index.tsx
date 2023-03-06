import * as React from 'react';
import styles from './index.less';
import { Image } from 'antd';
import CommunityInfo from '@/components/CommunityInfo';
import CommentArea from '@/components/CommentArea';

export type Props = {
  userImg?: string;
  watchNum?: number;
  commentOnNum?: number;
  likeNum?: number;
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
        <CommunityInfo userImg={userImg} />

        <div className={styles.textInfo}>
          In order to better support the new APP test, we decided to close Metis
          and OKC on this Sunday Test the network and end the airdrop activity.
          All airdrop awards are expected to be distributed on March 15. Thank
          you for your enthusiasm and support!
        </div>

        <div className={styles.mediumInfo}>
          {imgUrlArr.map((item, index) => (
            <Image src={item.url} className={styles.imgUrl} key={index} />
          ))}
        </div>

        <CommentArea watchNum={980} commentOnNum={456} likeNum={201} />
      </div>
    </div>
  );
};

export default GraphicMessage;
