import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, history } from 'umi';
import Web3 from 'web3';
import ChainApi from '@/services/ChainApi';
import Api from '@/services/Api';
import ProxyApi from '@/services/ProxyApi';

import { Models } from '@/declare/modelType';
import { message } from 'antd';
import Loading from '@/components/Loading';
import { useUrl } from '@/utils/hooks';

type Props = {
  match: {
    params: {
      address: string;
    };
  };
};

const Channel: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();
  const { address } = props.match.params;
  const [loading, setLoading] = useState<boolean>(true);
  const { api, requestLoading, proxyGroup } = useSelector(
    (state: Models) => state.global,
  );

  useEffect(() => {
    async function fetch() {
      if (Web3.utils.isAddress(address)) {
        const { data } = await ChainApi.getService({ address });
        if (data) {
          await Api.observeProxyGroup(api, data.group, [data.overlay]);
          dispatch({
            type: 'global/updateState',
            payload: {
              proxyGroup: data.group,
            },
          });
          return;
        }
      }
      message.info('Channel does not exist');
      history.replace('/home');
    }
    fetch();
  }, [props.match.params.address, requestLoading]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const info = await ProxyApi.getChannelInfo(url, address);
      if (info) {
        dispatch({
          type: 'global/updateState',
          payload: {
            channelInfo: info.data.data,
          },
        });
        setLoading(false);
      }
    }
    if (!requestLoading) {
      fetch();
    }
  }, [proxyGroup, requestLoading, url]);
  return (
    <>
      {requestLoading ? (
        <Loading text={'Connecting to a p2p network'} status={requestLoading} />
      ) : loading ? (
        <Loading text={'Loading data'} status={loading} />
      ) : (
        props.children
      )}
    </>
  );
};

export default Channel;
