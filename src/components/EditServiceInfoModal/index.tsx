import * as React from 'react';
import styles from './index.less';
import { Divider, Input, Modal } from 'antd';
import { useMemo, useState } from 'react';
import { useUrl } from '@/utils/hooks';
import { useDispatch } from 'umi';
import { Dao } from '@/declare/tubeApiType';

const { TextArea } = Input;

export type Props = {
  open: boolean;
  closeModal: () => void;
  onOk: (name: string, desc: string) => void;
  loading: boolean;
  dao?: Omit<Dao, 'visibility'>;
};
const EditServiceInfoModal: React.FC<Props> = (props) => {
  const { dao } = props;
  const [serviceName, setServiceName] = useState(dao?.name || '');
  const [serviceDescription, setServiceDescription] = useState(
    dao?.introduction || '',
  );

  const OKHandle = () => {
    props.onOk(serviceName, serviceDescription);
  };

  const createDisable = useMemo(() => {
    return !serviceName.trim() || !serviceDescription?.trim();
  }, [serviceName, serviceDescription]);

  return (
    <>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.editServiceInfoModal}
        open={props.open}
        destroyOnClose={true}
        okText="Create"
        onOk={OKHandle}
        okButtonProps={{ disabled: createDisable, loading: props.loading }}
        onCancel={() => {
          props.closeModal();
        }}
      >
        <div className={styles.modalContent}>
          <p className={styles.title}>Edit Info</p>
          <Divider style={{ margin: '16px 0' }} />
          <div className={`${styles.groupName} ${styles.item}`}>
            <p className={styles.label}>Name: </p>
            <Input
              placeholder="Please enter your name"
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
            />
          </div>
          <div className={`${styles.serviceDescription} ${styles.item}`}>
            <p className={styles.label}>Description:</p>
            <TextArea
              allowClear
              showCount={false}
              maxLength={100}
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="Please enter your description"
              value={serviceDescription}
              onChange={(e) => {
                setServiceDescription(e.target.value);
              }}
            />
          </div>
          {/*<div className={`${styles.channelAvatar} ${styles.item}`}>*/}
          {/*  <p className={styles.label}>Avatar:</p>*/}
          {/*  <ImageCrop*/}
          {/*    url={channelInfo?.avatar}*/}
          {/*    shape={'round'}*/}
          {/*    setImgBase64={(imgBase64) => {*/}
          {/*      imgRef.current = imgBase64;*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </Modal>
    </>
  );
};

export default EditServiceInfoModal;
