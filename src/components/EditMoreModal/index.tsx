import * as React from 'react';
import styles from './index.less';
import { Avatar, Divider, Input, message, Modal } from 'antd';
import { useRef, useState } from 'react';
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
};
const EditMoreModal: React.FC<Props> = (props) => {
  const url = useUrl();
  const dispatch = useDispatch();
  const { channelInfo } = useSelector((state: Models) => state.global);
  const [editMoreLoading, setEditMoreLoading] = useState<boolean>(false);
  const [channelDescription, setChannelDescription] = useState<
    string | undefined
  >(channelInfo?.introduction);
  const imgRef = useRef<string>();

  const editChannelMore = async () => {
    setEditMoreLoading(true);
    try {
      const info = await ProxyApi.updateChanel(url, {
        avatar: imgRef.current,
        introduction: channelDescription,
      });
      dispatch({
        type: 'global/updateState',
        payload: {
          channelInfo: info.data.data,
        },
      });
      props.closeModal();
    } catch (e) {
      if (e instanceof Error) message.info(e.message);
    } finally {
      setEditMoreLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.editMoreModal}
        open={props.open}
        destroyOnClose={true}
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
              value={channelDescription}
              onChange={(e) => {
                setChannelDescription(e.target.value);
              }}
            />
          </div>
          <div className={`${styles.channelAvatar} ${styles.item}`}>
            <p className={styles.label}>Avatar:</p>
            <ImageCrop
              url={channelInfo?.avatar}
              shape={'round'}
              setImgBase64={(imgBase64) => {
                imgRef.current = imgBase64;
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditMoreModal;
