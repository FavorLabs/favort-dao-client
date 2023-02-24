import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { ConfigProvider, Modal, Tooltip, Skeleton, message } from 'antd';
import {
  HeartOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import postApi from '@/services/tube/PostApi';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { history } from 'umi';

export type Props = {
  cardData: any;
};
const NewsletterCard: React.FC<Props> = (props) => {
  const { cardData } = props;
  const url = useUrl();
  const resourceUrl = useResourceUrl();
  const style = { '--len': 3 } as React.CSSProperties;
  const [modalType, setModalType] = useState<
    'delete' | 'public' | 'private' | false
  >(false);
  const confirm = () => {
    if (modalType === 'delete') deletePost(cardData.id);
    else setModalType(false);
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
    return cardData?.contents?.filter((item: any) => {
      return item.type === type;
    });
  };

  const deletePost = async (id: string) => {
    try {
      const { data } = await postApi.deletePost(url, id);
      if (data.data) {
        message.success('Delete successfully');
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setModalType(false);
    }
  };

  return (
    <>
      <div
        className={styles.card}
        onClick={() => history.push(`/dao/${cardData.daoId}`)}
      >
        <>
          <header>
            <div className={styles.info}>
              <div className={styles.avatar}>
                <img
                  src={
                    cardData?.user?.avatar
                      ? `${resourceUrl}/${cardData?.user?.avatar}`
                      : ''
                  }
                  alt={'avatar'}
                />
              </div>
              <span className={styles.name}>{cardData?.user?.nickname}</span>
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
            <div>
              {renderContent(1)?.map((item: any) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            <div>
              {renderContent(2)?.map((item: any) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </div>
          </div>
          <div className={styles.media} style={style}>
            {renderContent(3)?.map((item: any) => (
              <div key={item.id}>
                <img src={item.content} alt={'img'} />
              </div>
            ))}
          </div>
          <div className={styles.time}></div>
          <div className={styles.action}>
            <div className={styles.space}>
              <HeartOutlined className={styles.icon} />
              <span className={styles.count}>{cardData?.upvote_count}</span>
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
