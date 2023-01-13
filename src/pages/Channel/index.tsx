import { useEffect } from 'react';
import { useDispatch, useSelector, history } from 'umi';
import Web3 from 'web3';
import ChainApi from '@/services/ChainApi';
import Api from '@/services/Api';
import { Models } from '@/declare/modelType';
import { message } from 'antd';
import Loading from '@/components/Loading';

type Props = {
  match: {
    params: {
      address: string;
    };
  };
};

const Channel: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { api, requestLoading } = useSelector((state: Models) => state.global);

  useEffect(() => {
    async function fetch() {
      const { address } = props.match.params;
      console.log('address', address);
      if (Web3.utils.isAddress(address)) {
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
          return;
        }
      }
      message.info('Channel does not exist');
      // history.replace('/home');
    }

    fetch();
  }, [props.match.params.address]);
  return (
    <>
      {/*requestLoading*/}
      {false ? (
        <Loading text={'Connecting to a p2p network'} status={requestLoading} />
      ) : (
        props.children
      )}
    </>
  );
};

export default Channel;
