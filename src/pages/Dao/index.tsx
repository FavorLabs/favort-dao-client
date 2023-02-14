import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useHistory, useSelector } from 'umi';
import { Avatar, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/svgIcon';
import TopBar from '@/components/ThreeStageLayout/TopBar';
import Children from '@/components/ThreeStageLayout/Children';
import MenuBar from '@/components/ThreeStageLayout/MenuBar';
import avatar_1 from '@/assets/img/avatar_1.png';
import newsletterSvg from '@/assets/icon/newsletter.svg';
import videoSvg from '@/assets/icon/video.svg';
import daoSvg from '@/assets/icon/dao.svg';
import subscribeSvg from '@/assets/icon/subscribe.svg';
import Web3 from 'web3';
import ChainApi from '@/services/ChainApi';
import Api from '@/services/Api';
import ProxyApi from '@/services/ProxyApi';
import { useUrl, useVerifyChannel } from '@/utils/hooks';
import { Models } from '@/declare/modelType';
import Loading from '@/components/Loading';
import SubModal from '@/components/SubModal';

type Props = {
  match: {
    params: {
      address: string;
    };
  };
  history: {
    location: {
      query: {
        daoName: string;
      };
    };
  };
};
export type MenuItem = {
  key: number;
  title: string;
  icon: ReactNode;
  path: string;
};
const Dao: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = useUrl();
  const verifyChannel = useVerifyChannel();
  const { address } = props.match.params;

  const [subModal, setSubModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const { api, requestLoading, proxyGroup } = useSelector(
    (state: Models) => state.global,
  );

  const menuItems: MenuItem[] = [
    {
      key: 1,
      title: 'Newsletter',
      icon: <SvgIcon svg={newsletterSvg} />,
      path: '/newsletter',
    },
    {
      key: 2,
      title: 'Videos',
      icon: <SvgIcon svg={videoSvg} />,
      path: '/videos',
    },
    {
      key: 3,
      title: 'Group',
      icon: <SvgIcon svg={daoSvg} />,
      path: '/group',
    },
  ];

  useEffect(() => {
    async function fetch() {
      if (Web3.utils.isAddress(address)) {
        const { data } = await ChainApi.getService({ address });
        console.log('data', data);
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
      // history.replace('/main/daoList');
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
      <div className={`${styles.content} mobile`}>
        {requestLoading ? (
          <Loading
            text={'Connecting to a p2p network'}
            status={requestLoading}
          />
        ) : loading ? (
          <Loading text={'Loading data'} status={loading} />
        ) : (
          <>
            <TopBar
              content={
                <>
                  <span
                    className={styles.goBack}
                    onClick={() => {
                      history.push('/main/daoList');
                    }}
                  >
                    <ArrowLeftOutlined />
                  </span>
                  <div className={styles.daoNameSub}>
                    <span className={styles.daoName}>
                      {props.history.location.query.daoName}web3
                    </span>
                    {verifyChannel ? (
                      <></>
                    ) : (
                      <span
                        className={styles.subscribe}
                        onClick={() => {
                          setSubModal(true);
                        }}
                      >
                        <SvgIcon svg={subscribeSvg} />
                        &nbsp;subscribe
                      </span>
                    )}
                  </div>
                  <Avatar
                    size={24}
                    alt=""
                    src={avatar_1}
                    className={styles.userAvatar}
                    style={{ backgroundColor: '#F44336' }}
                  />
                </>
              }
            />
            <Children content={props.children} />
            <MenuBar items={menuItems} pathHook={true} />
            {subModal ? (
              <SubModal
                open={subModal}
                closeModal={() => {
                  setSubModal(false);
                }}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dao;
