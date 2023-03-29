import * as React from 'react';
import styles from './index.less';
import rightIcon from '@/assets/icon/right-icon.svg';
import { useState } from 'react';
import { Input } from 'antd';
import { Popup } from 'antd-mobile';

type Props = {
  list: [
    {
      title: string;
      date: string;
    },
  ];
  isSubmit?: boolean;
};

const ByMeList: React.FC<Props> = (props) => {
  const { list, isSubmit } = props;
  const [visible, setVisible] = useState(false);

  const submitClick = () => {
    if (isSubmit) setVisible(true);
  };

  const rejectClick = () => {
    setVisible(false);
  };

  const confirmClick = () => {
    setVisible(false);
  };

  return (
    <div className={styles.byMeList}>
      {list.map((item, index) => (
        <div key={index} className={styles.list} onClick={submitClick}>
          <p className={styles.title}>{item.title}</p>
          <div className={styles.right}>
            <p className={styles.text}>{item.date}</p>
            {isSubmit ? (
              <img src={rightIcon} alt="" className={styles.rightImg} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          <p className={styles.title}>Confirm Your Promotion</p>

          <div className={styles.inputRow}>
            <p className={styles.left}>FavorDAO</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>Twitter</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>YouTube</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.inputRow}>
            <p className={styles.left}>Meta</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="please input" />
            </div>
          </div>

          <div className={styles.buttonRow}>
            <div className={styles.reject} onClick={rejectClick}>
              Reject
            </div>
            <div className={styles.confirm} onClick={confirmClick}>
              Confirm
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ByMeList;
