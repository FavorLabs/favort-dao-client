// @flow
import { Models } from '@/declare/modelType';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, history, getLocale } from 'umi';
import { AliveScope } from 'react-activation';
import { ConnectType, NodeConfig } from '@/config/constants';
import { connect } from '@/utils/connect';
import { WalletType } from '@/declare/global';
import SettingApi from '@/components/SettingApi';
import Web3 from 'web3';
import { Config, favorTubeAbi, tokenAbi } from '@/config/config';
import Api from '@/services/Api';
import Loading from '@/components/Loading';
import styles from './index.less';
import UserApi from '@/services/tube/UserApi';
import { useUrl } from '@/utils/hooks';
import FavorlabsApi from '@/services/FavorlabsApi';
import {
  appName,
  checkLogin,
  flexible,
  getTokenKey,
  isFavorApp,
} from '@/utils/util';
import { setTheme, ThemeType } from '@/utils/setTheme';
import { defaultTheme } from '@/config/themeConfig';
import DaoApi from '@/services/tube/Dao';
import Bucket from '@/services/tube/Global';
import moment from 'moment';
const currentLang = getLocale();
import VConsole from 'vconsole';
if (!NETWORK_ID || (NETWORK_ID && NETWORK_ID === '19')) new VConsole();

const Layout: React.FC = (props) => {
  const dispatch = useDispatch();
  const url = useUrl();

  const { api, debugApi, ws, status, requestLoading, config, user } =
    useSelector((state: Models) => state.global);

  const { web3 } = useSelector((state: Models) => state.web3);
  const proxyResult = useRef<string | number | null>(null);
  const [configLoading, setConfigLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);

  const setMomentLang = () => {
    const currentLang = getLocale();
    moment.locale(currentLang);
  };

  const getContract = async () => {
    if (!config) return;
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

  const getConfig = async () => {
    // let nodeConfig = sessionStorage.getItem(NodeConfig);
    // if (nodeConfig) {
    //   let config = JSON.parse(nodeConfig);
    //   dispatch({
    //     type: 'global/updateState',
    //     payload: {
    //       config,
    //     },
    //   });
    //   // setConfig(config);
    //   setConfigLoading(false);
    //   return;
    // }
    const data = await Api.getAddresses(debugApi);
    localStorage.setItem('network_id', JSON.stringify(data.data.network_id));
    const config = await FavorlabsApi.getConfig(
      data.data.network_id,
      appName ?? undefined,
    );
    dispatch({
      type: 'global/updateState',
      payload: {
        config: config.data.data,
      },
    });
    sessionStorage.setItem(NodeConfig, JSON.stringify(config.data.data));
    setConfigLoading(false);
  };

  const connectNode = async () => {
    if (!config || !ws) return;
    await Api.observeProxyGroup(
      api,
      config.proxyGroup,
      config.proxyNodes,
    ).catch(console.error);
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

  const getUserCommunityInfo = async () => {
    const { data } = await DaoApi.get(url);
    if (data.data.list?.length) {
      dispatch({
        type: 'dao/updateState',
        payload: {
          userInfo: data.data.list[0],
        },
      });
    }
  };

  const getBucketInfo = async () => {
    if (!config) return;
    const { data } = await Bucket.getBucket(url);
    if (data.data) {
      dispatch({
        type: 'global/updateState',
        payload: {
          bucket: data.data.Settings.Bucket,
        },
      });
    }
  };

  const getLoginStatus = async () => {
    const connectType = localStorage.getItem(ConnectType);
    if (!checkLogin()) return history.push('/');
    try {
      const info = await UserApi.getInfo(url);
      const { address, web3 } = await connect(
        connectType as WalletType,
        true,
        config as Config,
      );
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
      if (e instanceof Error) {
        if (e.message.includes('timeout')) return;
        else {
          localStorage.removeItem(ConnectType);
          localStorage.removeItem(getTokenKey());
          history.push('/login');
        }
      }
    }
  };

  useEffect(() => {
    flexible(window, document);
    setTimeout(() => {
      setTheme(defaultTheme as ThemeType);
    }, 1000);
    dispatch({
      type: 'global/getStatus',
      payload: {
        api,
      },
    });
  }, []);

  useEffect(() => {
    if (status) {
      getConfig();
    }
  }, [status]);

  useEffect(() => {
    connectNode();
    // if (config) getContract()
  }, [config]);

  useEffect(() => {
    if (!requestLoading) getLoginStatus();
    if (!requestLoading && !connected) {
      setConnected(true);
      getBucketInfo();
    }
  }, [requestLoading]);

  useEffect(() => {
    // @ts-ignore
    web3?.currentProvider?.once('disconnect', () => {
      if (isFavorApp()) return;
      localStorage.removeItem('walletconnect');
      localStorage.removeItem(ConnectType);
      location.reload();
    });
  }, [web3]);

  useEffect(() => {
    if (user) {
      getUserCommunityInfo();
    }
  }, [user]);

  useEffect(() => {
    setMomentLang();
  }, [currentLang]);

  return (
    // @ts-ignore
    <AliveScope>
      <div className={styles.main}>
        {status ? (
          configLoading ? (
            <Loading text={'Loading Config !!!'} status={configLoading} />
          ) : requestLoading ? (
            <Loading
              text={'Connecting to a p2p network'}
              status={requestLoading}
            />
          ) : (
            <div className={styles.box}>{props.children}</div>
          )
        ) : (
          <SettingApi />
        )}
      </div>
    </AliveScope>
  );
};

export default Layout;
