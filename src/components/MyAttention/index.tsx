import * as React from 'react';
import styles from './index.less';
import { Avatar, Image } from 'antd';
import arrowRight from '@/assets/img/arrow_right.png';

export type Props = {
  userImg?: string;
};

const MyAttention: React.FC<Props> = (props) => {
  const { userImg } = props;
  const userArr = [
    {
      imgUrl:
        'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a',
      name: 'Dao1',
    },
    {
      imgUrl:
        'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a',
      name: 'Dao1',
    },
    {
      imgUrl:
        'https://img.js.design/assets/img/63fee9f013c9305ce9416782.png#fcb7b62b61d952467d3445d6bb64ce9a',
      name: 'Dao1',
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            <span className={styles.text}>我的创建</span>
            <span className={styles.text}>我的加入</span>
          </div>
          <div className={styles.navRight}>
            <span className={styles.text}>查看全部</span>
            <img src={arrowRight} className={styles.icon} />
          </div>
        </div>

        <div className={styles.bottomNav}>
          <div className={styles.myCreated}>
            <Avatar src={userImg} className={styles.icon} />
            <span className={styles.text}>FavorDao</span>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.myJoin}>
            {userArr.map((item, index) => {
              return (
                <div key={index} className={styles.userArr}>
                  <img src={item.imgUrl} className={styles.icon}></img>
                  <span className={styles.text}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttention;
