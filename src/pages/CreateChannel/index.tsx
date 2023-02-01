import * as React from 'react';
import styles from './index.less';

import { Button, Steps, Radio, Space, message } from 'antd';
import { useState } from 'react';

import { ProxyGroup, DomainName } from '@/config/constants';
import Api from '@/services/Api';
import ChainApi from '@/services/ChainApi';
import ProxyApi from '@/services/ProxyApi';
import { useDispatch, useSelector, history } from 'umi';
import { Models } from '@/declare/modelType';

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
  const buy = async () => {
    try {
      const { data } = await ChainApi.createService({
        address,
        overlay: ProxyGroup[value].overlay,
        group: ProxyGroup[value].name,
      });
      await Api.observeProxyGroup(api, data.group, [data.overlay]);
      dispatch({
        type: 'global/updateState',
        payload: {
          proxyGroup: data.group,
        },
      });
      const url =
        api + '/group/http/' + data.group + '/' + DomainName + '/api/v1';
      await ProxyApi.createChannel(url, {
        address,
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
              <Radio.Group
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <Space direction="vertical">
                  {ProxyGroup.map((item, index) => (
                    <Radio key={index} value={index}>
                      {item.name}
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
