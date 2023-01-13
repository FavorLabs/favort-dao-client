import * as React from 'react';
import styles from './index.less';
import { Avatar, Button, Row, Col, Modal, Input, Divider } from 'antd';
const { TextArea } = Input;
import {
  UploadOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ReactElement, useState } from 'react';
import { useHistory } from 'umi';

export type Props = {};
type navItems = {
  key: number;
  label: string;
  path: string;
  icon: ReactElement;
};

const Manage: React.FC<Props> = (props) => {
  const history = useHistory();

  const [channelName, setChannelName] = useState<string>('');
  const [channelDescription, setChannelDescription] = useState<string>('');

  const [channelNameModal, setChannelNameModal] = useState<boolean>(false);
  const [editNameLoading, setEditNameLoading] = useState<boolean>(false);
  const [channelMoreModal, setChannelMoreModal] = useState<boolean>(false);
  const [editMoreLoading, setEditMoreLoading] = useState<boolean>(false);
  const [uploadVideoModal, setUploadVideoModal] = useState<boolean>(false);
  const [uploadVideoLoading, setUploadVideoLoading] = useState<boolean>(false);

  const NavItems: navItems[] = [
    {
      key: 1,
      label: 'Videos',
      path: '/manage',
      icon: <VideoCameraOutlined />,
    },
    {
      key: 2,
      label: 'Others',
      path: '/manage/others',
      icon: <VideoCameraOutlined />,
    },
  ];

  const editChannelName = () => {
    setEditNameLoading(true);
    setTimeout(() => {
      setEditNameLoading(false);
      setChannelNameModal(false);
    }, 2000);
  };

  const editChannelMore = () => {
    setEditMoreLoading(true);
    setTimeout(() => {
      setEditMoreLoading(false);
      setChannelMoreModal(false);
    }, 2000);
  };

  const uploadVideo = () => {
    setUploadVideoLoading(true);
    setTimeout(() => {
      setUploadVideoLoading(false);
      setUploadVideoModal(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.content}>
        <header>
          <div className={styles.topBar}>
            <div className={styles.logo}>
              <span>FavorTube</span>
              <MenuOutlined className={styles.switchMenu} />
            </div>
            <Button
              type="primary"
              shape="circle"
              className={styles.uploadVideo}
            >
              <UploadOutlined />
            </Button>
          </div>
        </header>
        <main className={styles.main}>
          <Row className={styles.row}>
            <Col className={styles.asideCol} span={3}>
              <aside className={styles.aside}>
                <div className={styles.channelEdit}>
                  <Avatar
                    className={styles.avatar}
                    size={80}
                    style={{ backgroundColor: '#F44336', fontSize: '24px' }}
                  >
                    U
                  </Avatar>
                  <span className={styles.channelName}>
                    <span className={styles.name}>User</span>
                    <span
                      className={styles.editName}
                      onClick={() => {
                        setChannelNameModal(true);
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </span>
                  <Button
                    className={styles.editMore}
                    type="primary"
                    shape="round"
                    size="small"
                    onClick={() => {
                      setChannelMoreModal(true);
                    }}
                  >
                    Edit More
                  </Button>
                </div>
                <nav className={styles.navList}>
                  {NavItems.map((item, index) => {
                    return (
                      <div
                        className={`${styles.navItem} ${
                          item.path === history.location.pathname
                            ? styles.active
                            : ''
                        }`}
                        key={item.key}
                        onClick={() => {
                          history.push(item.path);
                        }}
                      >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </aside>
            </Col>
            <Col className={styles.editCol} span={21}>
              <article>{props.children}</article>
            </Col>
          </Row>
          <Modal
            title={null}
            centered
            maskClosable={false}
            className={styles.editNameModal}
            open={channelNameModal}
            onOk={editChannelName}
            confirmLoading={editNameLoading}
            onCancel={() => {
              setChannelNameModal(false);
            }}
          >
            <div className={styles.modalContent}>
              <p className={styles.title}>Edit channel name</p>
              <Divider style={{ margin: '16px 0' }} />
              <p className={styles.currentName}>
                <span className={styles.label}>Current Name:&emsp;</span>
                <span className={styles.current}>User</span>
              </p>
              <Input
                placeholder="Please enter channel name"
                allowClear
                onChange={(e) => {
                  setChannelName(e.target.value);
                }}
              />
            </div>
          </Modal>
          <Modal
            title={null}
            centered
            maskClosable={false}
            className={styles.editMoreModal}
            open={channelMoreModal}
            onOk={editChannelMore}
            confirmLoading={editMoreLoading}
            onCancel={() => {
              setChannelMoreModal(false);
            }}
          >
            <div className={styles.modalContent}>
              <p className={styles.title}>Edit channel Info</p>
              <Divider style={{ margin: '16px 0' }} />
              <div className={`${styles.channelDescription} ${styles.item}`}>
                <p className={styles.label}>Description:</p>
                <TextArea
                  allowClear
                  showCount
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  placeholder="Please enter channel description"
                  onChange={(e) => {
                    setChannelDescription(e.target.value);
                  }}
                />
              </div>
              <div className={`${styles.channelAvatar} ${styles.item}`}>
                <p className={styles.label}>Avatar:</p>
                <Avatar
                  className={styles.avatar}
                  size={36}
                  style={{ backgroundColor: '#F44336', fontSize: '16px' }}
                >
                  U
                </Avatar>
              </div>
            </div>
          </Modal>
          <Modal
            title={null}
            centered
            maskClosable={false}
            className={styles.uploadVideoModal}
            open={uploadVideoModal}
            onOk={uploadVideo}
            confirmLoading={uploadVideoLoading}
            onCancel={() => {
              setUploadVideoModal(false);
            }}
          >
            <div className={styles.modalContent}>
              <p className={styles.title}>Upload Video</p>
              <Divider style={{ margin: '16px 0' }} />
              <div className={styles.videoDetail}>
                <div className={`${styles.text} ${styles.item}`}>
                  <p className={styles.label}>Details</p>
                </div>
                <div className={styles.thumbnail}>thumbnail</div>
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Manage;
