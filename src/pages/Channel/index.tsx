import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, history } from 'umi';
import Web3 from 'web3';
import ChainApi from '@/services/ChainApi';
import Api from '@/services/Api';
import ProxyApi from '@/services/ProxyApi';

import { Models } from '@/declare/modelType';
import { message } from 'antd';
import Loading from '@/components/Loading';
import { DomainName } from '@/config/constants';

type Props = {
  match: {
    params: {
      address: string;
    };
  };
};

const Channel: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [clInfoLoading, setClInfoLoading] = useState<boolean>(true);
  const { api, requestLoading } = useSelector((state: Models) => state.global);

  useEffect(() => {
    async function fetch() {
      const { address } = props.match.params;
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
          const url =
            api + '/group/http/' + data.group + '/' + DomainName + '/api/v1';
          const info = await ProxyApi.getChannelInfo(url, address);
          await dispatch({
            type: 'global/updateState',
            payload: {
              channelInfo: info.data.data || {},
            },
          });
          setClInfoLoading(false);
          return;
        }
      }
      message.info('Channel does not exist');
      // history.replace('/home');
    }

    if (requestLoading) {
      fetch();
    }
  }, [props.match.params.address, requestLoading]);
  return (
    <>
      {requestLoading || clInfoLoading ? (
        <Loading text={'Connecting to a p2p network'} status={requestLoading} />
      ) : (
        props.children
      )}
    </>
  );
};

export default Channel;
