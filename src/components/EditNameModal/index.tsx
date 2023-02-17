import * as React from 'react';
import styles from './index.less';
import { Divider, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import ChainApi from '@/services/ChainApi';
import ChannelApi from '@/services/tube/ChannelApi';
import { useUrl } from '@/utils/hooks';

export type Props = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
const EditNameModal: React.FC<Props> = (props) => {
  const url = useUrl();
  const dispatch = useDispatch();
  const { channelInfo } = useSelector((state: Models) => state.channel);
  const [channelName, setChannelName] = useState<string>('');
  const [editNameLoading, setEditNameLoading] = useState<boolean>(false);

  const editChannelName = async () => {
    setEditNameLoading(true);
    try {
      let [_, info] = await Promise.all([
        ChainApi.updateChannelName({
          address: channelInfo?.address,
          channelName,
        }),
        ChannelApi.updateChanel(url, {
          name: channelName,
        }),
      ]);
      dispatch({
        type: 'channel/updateState',
        payload: {
          channelInfo: info.data.data,
        },
      });
      props.closeModal();
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setEditNameLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.editNameModal}
        open={props.open}
        destroyOnClose={true}
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
            <span className={styles.current}>{channelInfo?.name}</span>
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
