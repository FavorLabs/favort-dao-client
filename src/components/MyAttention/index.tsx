import * as React from 'react';
import styles from './index.less';
import { Avatar, Image } from 'antd';
import arrowRight from '@/assets/img/arrow_right.png';
import { useState } from 'react';

export type Props = {
  userImg?: string;
};

const MyAttention: React.FC<Props> = (props) => {
  const { userImg } = props;
  const [isSel, setIsSel] = useState(-1);
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
            <span className={styles.text}>my creation</span>
            <span className={styles.text}>my joined</span>
          </div>
          <div className={styles.navRight}>
            <span className={styles.text}>query whole</span>
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
                <div
                  key={index}
                  // className={styles.userArr && isSel ? 'active' : ''}
                  className={`${styles.userArr}`}
                  onClick={() => {
                    setIsSel(index);
                  }}
                >
                  <img
                    src={item.imgUrl}
                    className={`${isSel === index ? 'imgActive' : 'icon'}`}
                    style={{
                      width: isSel === index ? '46px' : '50px',
                      height: isSel === index ? '46px' : '50px',
                      border:
                        isSel === index ? '2px solid rgba(255, 166, 0, 1)' : '',
                      borderRadius: isSel === index ? '50%' : '',
                    }}
                  ></img>
                  <span className={styles.texts}>{item.name}</span>
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
