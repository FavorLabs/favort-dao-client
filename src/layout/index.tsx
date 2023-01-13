// @flow
import { Models } from '@/declare/modelType';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch, history } from 'umi';
import { ConnectType } from '@/config/constants';
import { connect } from '@/utils/connect';
import { WalletType } from '@/declare/global';
import { JsonRpcResponse } from 'web3-core-helpers';
import SettingApi from '@/components/SettingApi';

const Layout: React.FC = (props) => {
  const dispatch = useDispatch();

  const { api, proxyGroup, ws, status } = useSelector(
    (state: Models) => state.global,
  );
  const proxyResult = useRef<string | number | null>(null);

  useEffect(() => {
    dispatch({
      type: 'global/getStatus',
      payload: {
        api,
      },
    });
    const connectType = localStorage.getItem(ConnectType);
    if (connectType) {
      connect(connectType as WalletType, true)
        .then(({ web3, address }) => {
          dispatch({
            type: 'global/updateState',
            payload: {
              web3,
              address,
            },
          });
        })
        .catch(() => {
          localStorage.removeItem(ConnectType);
          history.push('/');
        });
    } else {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (!proxyGroup || !ws) return;
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
        params: ['peers', proxyGroup],
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
  }, [proxyGroup, ws]);

  return (
    <>
      <SettingApi />
      {props.children}
    </>
  );
};

export default Layout;
