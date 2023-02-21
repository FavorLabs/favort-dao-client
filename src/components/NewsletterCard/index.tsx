import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { ConfigProvider, Modal, Tooltip, Skeleton } from 'antd';
import {
  HeartOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

export type Props = {
  cardData: any;
};
const NewsletterCard: React.FC<Props> = (props) => {
  const { cardData } = props;
  console.log('cardData', cardData);
  const style = { '--len': 3 } as React.CSSProperties;
  const [modalType, setModalType] = useState<
    'delete' | 'public' | 'private' | false
  >(false);
  const confirm = () => {
    setModalType(false);
  };

  const Operation = () => {
    return (
      <div className={styles.operateBox}>
        <div className={styles.operate} onClick={() => setModalType('delete')}>
          Delete
        </div>
        <div className={styles.operate} onClick={() => setModalType('public')}>
          Public
        </div>
      </div>
    );
  };

  const renderContent = (type: number) => {
    return cardData.contents.find((item: any) => {
      return item.type === type;
    });
  };

  return (
    <>
      <div className={styles.card}>
        <>
          <header>
            <div className={styles.info}>
              <div className={styles.avatar}>
                <img
                  src={
                    cardData.user.avatar &&
                    'https://assets.paopao.info/public/avatar/default/norman.png'
                  }
                  alt={'avatar'}
                />
              </div>
              <span className={styles.name}>{cardData.user.nickname}</span>
            </div>
            <div>
              <Tooltip
                placement="bottomRight"
                title={<Operation />}
                arrow={false}
                color={'#fff'}
                overlayInnerStyle={{
                  borderRadius: 0,
                }}
                trigger={['click']}
                zIndex={1}
              >
                <EllipsisOutlined />
              </Tooltip>
            </div>
          </header>
          <div className={styles.content}>
            <div>{renderContent(0)}</div>
          </div>
          <div className={styles.media} style={style}>
            <div>
              <img
                src={
                  'http://192.168.100.250:9010/paopao/public/image/d0/64/1d/ea/8750-4fcf-a766-ba29dcd5eec6.jpeg?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0/auto-orient,1/format,png'
                }
                alt={'img'}
              />
            </div>
            <div>
              <img
                src={
                  'http://192.168.100.250:9010/paopao/public/image/d0/64/1d/ea/8750-4fcf-a766-ba29dcd5eec6.jpeg?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0/auto-orient,1/format,png'
                }
                alt={'img'}
              />
            </div>
            <div>
              <img
                src={
                  'http://192.168.100.250:9010/paopao/public/image/d0/64/1d/ea/8750-4fcf-a766-ba29dcd5eec6.jpeg?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0/auto-orient,1/format,png'
                }
                alt={'img'}
              />
            </div>
            <div>
              <img
                src={
                  'http://192.168.100.250:9010/paopao/public/image/d0/64/1d/ea/8750-4fcf-a766-ba29dcd5eec6.jpeg?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0/auto-orient,1/format,png'
                }
                alt={'img'}
              />
            </div>
          </div>
          <div className={styles.time}>
            <span>发布于 4 小时前</span>
          </div>
          <div className={styles.action}>
            <div className={styles.space}>
              <HeartOutlined className={styles.icon} />
              <span className={styles.count}>1</span>
            </div>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#18a058',
              },
            }}
          >
            <Modal
              title={
                <>
                  <ExclamationCircleFilled
                    style={{ color: '#18a058', marginRight: 5 }}
                  />
                  Tips
                </>
              }
              open={!!modalType}
              centered
              onCancel={() => setModalType(false)}
              onOk={confirm}
            >
              {modalType === 'delete'
                ? 'Confirm the deletion of dynamics?'
                : `Are you sure to change the visibility of this bubble dynamic to ${modalType}?`}
            </Modal>
          </ConfigProvider>
        </>
      </div>
    </>
  );
};

export default NewsletterCard;
