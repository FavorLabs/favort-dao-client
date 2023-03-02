import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { useHistory, useSelector } from 'umi';
import { Avatar, Divider, message, Modal } from 'antd';
import { Models } from '@/declare/modelType';
import avatar_1 from '@/assets/img/avatar_1.png';
import { omitAddress } from '@/utils/util';
import CopyText from '@/components/CopyText';
import newsletterSvg from '@/assets/icon/newsletter.svg';
import videoSvg from '@/assets/icon/video.svg';
import daoSvg from '@/assets/icon/dao.svg';
import configSvg from '@/assets/icon/config.svg';
import addSvg from '@/assets/icon/add.svg';
import SvgIcon from '@/components/SvgIcon';
import UploadVideoModal from '@/components/UploadVideoModal';
import EditServiceInfoModal from '@/components/EditServiceInfoModal';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { sleep } from '@/utils/util';
import { DaoInfo } from '@/declare/tubeApiType';

export type Props = {};
type ManageItem = {
  key: number;
  title: string;
  icon: ReactNode;
  tabIndex: number;
};
type AnimConfig = {
  open: boolean;
  text: string;
};
const Mine: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const [daoInfo, setDaoInfo] = useState<DaoInfo>();
  const [haveGroupService, setHaveGroupService] = useState<boolean>(false);
  const [tipsModal, setTipsModal] = useState<boolean>(false);
  const [createGpModal, setCreateGpModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    open: false,
    text: '',
  });
  const [balance, setBalance] = useState('0');

  const { address, web3 } = useSelector((state: Models) => state.web3);

  useEffect(() => {
    async function fetch() {
      const { data } = await DaoApi.get(url);
      if (data.data.list.length) {
        setHaveGroupService(true);
        setDaoInfo(data.data.list[0]);
      }
    }

    fetch();
  }, []);

  const manageItems: ManageItem[] = [
    {
      key: 1,
      title: 'newsletter',
      icon: <SvgIcon svg={newsletterSvg} />,
      tabIndex: 1,
    },
    {
      key: 2,
      title: 'videos',
      icon: <SvgIcon svg={videoSvg} />,
      tabIndex: 2,
    },
    {
      key: 3,
      title: 'group',
      icon: <SvgIcon svg={daoSvg} />,
      tabIndex: 3,
    },
  ];
  const getBalance = async () => {
    // if (!web3) return;
    // const b = await web3.eth.getBalance(address);
    // if (b) setBalance(web3.utils.fromWei(b, 'ether'));
  };
  const createGroupService = async (name: string, desc: string) => {
    setCreateLoading(true);
    setAnimConfig({ open: true, text: 'The server is being created...' });
    try {
      const { data } = await DaoApi.create(url, { name, introduction: desc });
      if (data.code === 0) {
        await sleep(2000);
        closeGpModal();
        setAnimConfig({ open: true, text: 'Generating configurations...' });
        await sleep(3000);
        setAnimConfig({ open: false, text: '' });
        setHaveGroupService(true);
        setDaoInfo(data.data);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setAnimConfig({ open: false, text: '' });
      setCreateLoading(false);
    }
  };

  const tipsModalConfirm = () => {
    setTipsModal(false);
    setCreateGpModal(true);
  };

  const closeGpModal = () => {
    setCreateGpModal(false);
  };

  useEffect(() => {
    if (web3) {
      getBalance();
    }
  }, [web3]);

  return (
    <>
      <div className={styles.content}>
        {!haveGroupService && (
          <div className={styles.topBtn}>
            <span>&nbsp;</span>
            <span
              className={styles.creatGroup}
              onClick={() => {
                setTipsModal(true);
              }}
            >
              Create my group
            </span>
          </div>
        )}
        <div className={styles.walletInfo}>
          <div className={styles.walletDetails}>
            <Avatar
              size={24}
              alt=""
              src={avatar_1}
              className={styles.avatar}
              style={{ backgroundColor: '#F44336' }}
            />
            <div className={styles.name}>Account</div>
            <div className={styles.balance}>{balance}</div>
            <div className={styles.addressBtn}>
              <span className={styles.address}>{omitAddress(address)}</span>
              <CopyText text={address} />
            </div>
          </div>
        </div>
        <div className={styles.manageList}>
          {haveGroupService &&
            manageItems.map((item) => (
              <div className={styles.manageItem} key={item.key}>
                <div className={styles.left}>
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.title}>{item.title}</div>
                </div>
                <div className={styles.right}>
                  <span className={styles.configBtn}>
                    <SvgIcon svg={configSvg} />
                    <span
                      className={styles.text}
                      onClick={() => {
                        history.push(
                          `/dao/${daoInfo?.id}?tabIndex=${item.tabIndex}`,
                        );
                      }}
                    >
                      config
                    </span>
                  </span>
                </div>
              </div>
            ))}
        </div>
        <Modal
          title={null}
          open={tipsModal}
          centered
          closable={false}
          destroyOnClose
          maskClosable={false}
          width={400}
          okText="Ok"
          onOk={tipsModalConfirm}
          onCancel={() => {
            setTipsModal(false);
          }}
          className={styles.tipsModal}
        >
          <div className={'modalContent'}>
            <p className={'title'}>Create decentralised services</p>
            <Divider className={'divider'} />
            <p className={styles.desc}>
              Does a decentralised service that records your data, videos and
              fan information separately on a decentralised server that is
              entirely under your control need to be created?
            </p>
          </div>
        </Modal>
        {createGpModal ? (
          <EditServiceInfoModal
            open={createGpModal}
            closeModal={closeGpModal}
            onOk={createGroupService}
            loading={createLoading}
          />
        ) : (
          <></>
        )}
        {animConfig.open && (
          <div className={styles.createAnimation}>
            <div className={styles.animation} />
            <p className={styles.tips}>{animConfig.text}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Mine;
