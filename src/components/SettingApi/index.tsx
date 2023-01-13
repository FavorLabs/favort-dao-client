import React, { KeyboardEvent, useState } from 'react';
import styles from './index.less';
import { Button, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { OnChange } from '@/declare/event';
import { Models } from '@/declare/modelType';

export type Props = {};
const SettingApi: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { api, status, ws } = useSelector((state: Models) => state.global);
  const [value, setValue] = useState(api);

  const saveApi = () => {
    if (!status || api !== value.trim()) {
      ws?.disconnect();
      dispatch({
        type: 'global/getStatus',
        payload: {
          api: value.trim(),
        },
      });
    }
  };

  const saveKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      saveApi();
    }
  };

  return (
    <>
      <Modal
        title={''}
        footer={null}
        maskClosable={false}
        centered
        open={!status}
      >
        <h1>Setting</h1>
        <div className={styles.subtitle}>API Endpoint</div>
        <div className={styles.input}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={saveKeyDown}
          />
        </div>
        <div className={styles.tips}>(Enter node host override / port)</div>
        <Button block className={styles.save} onClick={saveApi}>
          Save
        </Button>
      </Modal>
    </>
  );
};

export default SettingApi;
