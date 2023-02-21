// @flow
import { Models } from '@/declare/modelType';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch, history } from 'umi';
import { ConnectType } from '@/config/constants';
import { connect } from '@/utils/connect';
import { WalletType } from '@/declare/global';
import SettingApi from '@/components/SettingApi';
import Web3 from 'web3';
import { config, favorTubeAbi, tokenAbi } from '@/config/config';
import Api from '@/services/Api';
import Loading from '@/components/Loading';
import styles from './index.less';
import web3 from '@/models/web3';
import UserApi from '@/services/tube/UserApi';
import { useUrl } from '@/utils/hooks';

const Layout: React.FC = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();

  const { api, ws, status, requestLoading } = useSelector(
    (state: Models) => state.global,
  );
  const proxyResult = useRef<string | number | null>(null);

  const getContract = async () => {
    const nodeWeb3 = new Web3(api + '/chain');
    const tubeContract = new nodeWeb3.eth.Contract(
      favorTubeAbi,
      config.favorTubeAddress,
    );
    const tokenContract = new nodeWeb3.eth.Contract(
      tokenAbi,
      config.favorTokenAddress,
    );
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = await tokenContract.methods.decimals().call();
    dispatch({
      type: 'web3/updateState',
      payload: {
        nodeWeb3,
        tokenContract,
        tubeContract,
        tokenInfo: {
          name,
          symbol,
          decimals,
        },
      },
    });
  };

  const connectNode = async () => {
    if (!config || !ws) return;
    Api.observeProxyGroup(api, config.proxyGroup, config.proxyNodes).catch(
      console.error,
    );
    if (proxyResult.current) {
      ws.send(
        {
          id: 1,
          jsonrpc: '2.0',
          method: 'group_unsubscribe',
          params: [proxyResult.current],
        },
        (error, result) => {
          console.log(error, result);
        },
      );
    }
    ws.send(
      {
        id: 1,
        jsonrpc: '2.0',
        method: 'group_subscribe',
        params: ['peers', config.proxyGroup],
      },
      (error, result) => {
        if (result) {
          proxyResult.current = result.result;
          // @ts-ignore
          ws.on(result.result, (res) => {
            console.log(res);
            dispatch({
              type: 'global/updateState',
              payload: {
                requestLoading: !res.connected?.length,
              },
            });
          });
        }
      },
    );
  };

  const getLoginStatus = async () => {
    const token = localStorage.getItem('token');
    const connectType = localStorage.getItem(ConnectType);
    if (!token || !connectType) return history.push('/');
    try {
      const info = await UserApi.getInfo(url);
      const { address, web3 } = await connect(connectType as WalletType, true);
      dispatch({
        type: 'global/updateState',
        payload: {
          user: info.data.data,
        },
      });
      dispatch({
        type: 'web3/updateState',
        payload: {
          web3,
          address,
        },
      });
    } catch (e) {
      localStorage.removeItem(ConnectType);
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  useEffect(() => {
    dispatch({
      type: 'global/getStatus',
      payload: {
        api,
      },
    });
  }, []);

  useEffect(() => {
    if (status) {
      // getContract();
      getLoginStatus();
      connectNode();
    }
  }, [status]);

  return (
    <div className={styles.main}>
      {status ? (
        // requestLoading ?
        //   <Loading
        //     text={'Connecting to a p2p network'}
        //     status={requestLoading}
        //   /> :
        <div className={styles.box}>{props.children}</div>
      ) : (
        <SettingApi />
      )}
    </div>
  );
};

export default Layout;
