import * as React from 'react';
import styles from './index.less';

import { Button, Steps, Radio, Space, message } from 'antd';
import { useState } from 'react';

import { ProxyOverlay, ProxyGroup, DomainName } from '@/config/constants';
import Api from '@/services/Api';
import ChainApi from '@/services/ChainApi';
import { useDispatch, useSelector, history } from 'umi';
import { Models } from '@/declare/modelType';
import { AxiosError } from 'axios';

export type Props = {};
const CreateChannel: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { api, address } = useSelector((state: Models) => state.global);
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: 'Select Service',
      content: 'First-content',
    },
    // {
    //   title: 'Input Info',
    //   content: 'Second-content',
    // },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const next = () => {
    setCurrent(current + 1);
  };
  const [value, setValue] = useState(0);
  const serviceList = [
    {
      group: ProxyGroup,
    },
  ];
  const buy = async () => {
    try {
      const { data } = await ChainApi.createService({
        address,
        overlay: ProxyOverlay,
        group: ProxyGroup,
      });
      await Api.observeProxyGroup(api, data.group, [data.overlay]);
      dispatch({
        type: 'global/updateState',
        payload: {
          proxyGroup: data.group,
        },
      });
      history.replace(`/${address}`);
    } catch (e) {
      message.error('Address or channel name is registered');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <Steps current={current} items={items} />
        <article>
          {current === 0 && (
            <>
              <Radio.Group value={value}>
                <Space direction="vertical">
                  {serviceList.map((item, index) => (
                    <Radio key={index} value={index}>
                      {item.group}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </>
          )}
        </article>
        <div className={styles.btn}>
          {current === 0 && (
            <Button type="primary" onClick={buy}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
