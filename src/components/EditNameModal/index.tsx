import * as React from 'react';
import styles from './index.less';
import { Divider, Input, Modal } from 'antd';
import { useState } from 'react';

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
const EditNameModal: React.FC<Props> = (props) => {
  const [channelName, setChannelName] = useState<string>('');
  const [editNameLoading, setEditNameLoading] = useState<boolean>(false);

  const editChannelName = () => {
    setEditNameLoading(true);
    setTimeout(() => {
      setEditNameLoading(false);
      props.closeModal();
    }, 2000);
  };

  return (
    <>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.editNameModal}
        open={props.open}
        onOk={editChannelName}
        confirmLoading={editNameLoading}
        onCancel={() => {
          props.closeModal();
        }}
      >
        <div className={styles.modalContent}>
          <p className={styles.title}>Edit channel name</p>
          <Divider style={{ margin: '16px 0' }} />
          <p className={styles.currentName}>
            <span className={styles.label}>Current Name:&emsp;</span>
            <span className={styles.current}>User</span>
          </p>
          <Input
            placeholder="Please enter channel name"
            allowClear
            onChange={(e) => {
              setChannelName(e.target.value);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditNameModal;
