import * as React from 'react';
import styles from './index.less';
import { ReactNode, useState } from 'react';
import { useHistory, useSelector } from 'umi';
import { Avatar, Divider, message, Modal } from 'antd';
import { Models } from '@/declare/modelType';
import avatar_1 from '@/assets/img/avatar_1.png';
import { omitAddress } from '@/utils/util';
import CopyText from '@/components/copyText';
import newsletterSvg from '@/assets/icon/newsletter.svg';
import videoSvg from '@/assets/icon/video.svg';
import daoSvg from '@/assets/icon/dao.svg';
import configSvg from '@/assets/icon/config.svg';
import addSvg from '@/assets/icon/add.svg';
import SvgIcon from '@/components/svgIcon';
import UploadVideoModal from '@/components/UploadVideoModal';
import EditServiceInfoModal from '@/components/EditServiceInfoModal';

export type Props = {};
type ManageItem = {
  key: number;
  title: string;
  icon: ReactNode;
  configPath: string;
  allowCreate: boolean;
  createFn?: () => void;
};
type AnimConfig = {
  open: boolean;
  text: string;
};
const Mine: React.FC<Props> = (props) => {
  const history = useHistory();

  const [haveGroupService, setHaveGroupService] = useState<boolean>(false);
  const [tipsModal, setTipsModal] = useState<boolean>(false);
  const [createGpModal, setCreateGpModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    open: false,
    text: '',
  });
  const [uploadVideoModal, setUploadVideoModal] = useState<boolean>(false);

  const { address } = useSelector((state: Models) => state.global);

  const manageItems: ManageItem[] = [
    {
      key: 1,
      title: 'newsletter',
      icon: <SvgIcon svg={newsletterSvg} />,
      configPath: 'newsletter',
      allowCreate: true,
      createFn: () => {},
    },
    {
      key: 2,
      title: 'videos',
      icon: <SvgIcon svg={videoSvg} />,
      configPath: 'videos',
      allowCreate: true,
      createFn: () => {
        setUploadVideoModal(true);
      },
    },
    {
      key: 3,
      title: 'group',
      icon: <SvgIcon svg={daoSvg} />,
      configPath: 'group',
      allowCreate: false,
    },
  ];

  const createGroupService = async (name: string, desc: string | undefined) => {
    console.log('name', name, desc);
    setCreateLoading(true);
    setAnimConfig({ open: true, text: 'The server is being created...' });
    try {
      const data = await new Promise((res, rej) => {
        setTimeout(() => {
          res('true');
        }, 5000);
      });
      if (data) {
        closeGpModal();
        setAnimConfig({ open: true, text: 'Generating configurations...' });
        setTimeout(() => {
          setAnimConfig({ open: false, text: '' });
          setHaveGroupService(true);
        }, 3000);
      }
    } catch (e) {
      setAnimConfig({ open: false, text: '' });
      if (e instanceof Error) message.error(e.message);
    } finally {
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
            <div className={styles.balance}>$2.5</div>
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
                        history.push(`/dao/${address}/${item.configPath}`);
                      }}
                    >
                      config
                    </span>
                  </span>
                  {item.allowCreate && (
                    <span className={styles.createBtn}>
                      <SvgIcon svg={addSvg} />
                      <span className={styles.text} onClick={item.createFn}>
                        create {item.title}
                      </span>
                    </span>
                  )}
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
            openModal={() => {
              setCreateGpModal(true);
            }}
            closeModal={closeGpModal}
            onOk={createGroupService}
            loading={createLoading}
          />
        ) : (
          <></>
        )}
        {uploadVideoModal && (
          <UploadVideoModal
            open={uploadVideoModal}
            openModal={() => {
              setUploadVideoModal(true);
            }}
            closeModal={() => {
              setUploadVideoModal(false);
            }}
          />
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
