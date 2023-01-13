import * as React from 'react';
import styles from './index.less';

import { AutoComplete, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { history, useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import ChainApi from '@/services/ChainApi';
import Api from '@/services/Api';
import Web3 from 'web3';

export type Props = {};
const Home: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { api, address } = useSelector((state: Models) => state.global);

  const [value, setValue] = useState('');
  const [hava, setHave] = useState(false);

  useEffect(() => {
    async function fetch() {
      const { data } = await ChainApi.getService({ address });
      console.log('Service', data);
      if (data) {
        await Api.observeProxyGroup(api, data.group, [data.overlay]);
        dispatch({
          type: 'global/updateState',
          payload: {
            proxyGroup: data.group,
          },
        });
        setHave(true);
      } else {
        setHave(false);
      }
    }

    if (address) fetch();
  }, [address]);

  const enter = async () => {
    if (!value) return;
    let key = Web3.utils.isAddress(value) ? 'address' : 'channelName';
    const { data } = await ChainApi.getService({
      [key as 'address' as 'channelName']: value,
    });
    if (data) {
      await Api.observeProxyGroup(api, data.group, [data.overlay]);
      dispatch({
        type: 'global/updateState',
        payload: {
          proxyGroup: data.group,
        },
      });
      history.push(`/${value}`);
    } else {
      message.info('Channel does not exist');
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <h1>FavorTube</h1>
        <div className={styles.go}>
          <AutoComplete
            className={styles.input}
            placeholder="Channel Name / Address"
            value={value}
            onChange={(data) => {
              setValue(data);
            }}
          />
          <Button onClick={enter} className={styles.enter} type="dashed">
            Enter
          </Button>
        </div>
        <div className={styles.channel}>
          {hava ? (
            <Button type="dashed" href={`#/${address}`}>
              My Channel
            </Button>
          ) : (
            <Button type="dashed" href="/create">
              Create Channel
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
