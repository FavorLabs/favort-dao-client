import * as React from 'react';
import styles from './index.less';
import { Avatar, Divider, Input, Modal } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
const EditMoreModal: React.FC<Props> = (props) => {
  const [editMoreLoading, setEditMoreLoading] = useState<boolean>(false);
  const [channelDescription, setChannelDescription] = useState<string>('');

  const editChannelMore = () => {
    setEditMoreLoading(true);
    setTimeout(() => {
      setEditMoreLoading(false);
      props.closeModal();
    }, 2000);
  };

  return (
    <>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.editMoreModal}
        open={props.open}
        onOk={editChannelMore}
        confirmLoading={editMoreLoading}
        onCancel={() => {
          props.closeModal();
        }}
      >
        <div className={styles.modalContent}>
          <p className={styles.title}>Edit channel Info</p>
          <Divider style={{ margin: '16px 0' }} />
          <div className={`${styles.channelDescription} ${styles.item}`}>
            <p className={styles.label}>Description:</p>
            <TextArea
              allowClear
              showCount
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="Please enter channel description"
              onChange={(e) => {
                setChannelDescription(e.target.value);
              }}
            />
          </div>
          <div className={`${styles.channelAvatar} ${styles.item}`}>
            <p className={styles.label}>Avatar:</p>
            <Avatar
              className={styles.avatar}
              size={36}
              style={{ backgroundColor: '#F44336', fontSize: '16px' }}
            >
              U
            </Avatar>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditMoreModal;
