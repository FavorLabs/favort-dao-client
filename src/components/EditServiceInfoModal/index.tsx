import * as React from 'react';
import styles from './index.less';
import { Avatar, Divider, Input, message, Modal } from 'antd';
import { Ref, useMemo, useRef, useState } from 'react';
import ImageCrop from '@/components/ImageCrop';
import { useUrl } from '@/utils/hooks';
import { useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import ProxyApi from '@/services/ProxyApi';

const { TextArea } = Input;

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  onOk: (name: string, desc: string | undefined) => void;
  loading: boolean;
};
const EditServiceInfoModal: React.FC<Props> = (props) => {
  const url = useUrl();
  const dispatch = useDispatch();
  const { channelInfo } = useSelector((state: Models) => state.global);
  const [editInfoLoading, setEditInfoLoading] = useState<boolean>(false);
  const [serviceName, setServiceName] = useState<string>('');
  const [serviceDescription, setServiceDescription] = useState<
    string | undefined
  >(channelInfo?.introduction);
  const imgRef = useRef<string>();

  // const editChannelMore = async () => {
  //   setEditInfoLoading(true);
  //   try {
  //     const info = await ProxyApi.updateChanel(url, {
  //       avatar: imgRef.current,
  //       introduction: serviceDescription,
  //     });
  //     dispatch({
  //       type: 'global/updateState',
  //       payload: {
  //         channelInfo: info.data.data,
  //       },
  //     });
  //     props.closeModal();
  //   } catch (e) {
  //     if (e instanceof Error) message.info(e.message);
  //   } finally {
  //     setEditInfoLoading(false);
  //   }
  // };

  const oKHandle = () => {
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
        onOk={oKHandle}
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
              showCount
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
