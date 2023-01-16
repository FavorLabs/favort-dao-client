import * as React from 'react';
import styles from './index.less';
import { Avatar, Button, Row, Col, Modal, Input, Divider } from 'antd';
import {
  UploadOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ReactElement, useState } from 'react';
import { useHistory } from 'umi';
import { usePath } from '@/utils/hooks';
import EditNameModal from '@/components/EditNameModal';
import EditMoreModal from '@/components/EditMoreModal';
import UploadVideoModal from '@/components/UploadVideoModal';

export type Props = {};
type navItems = {
  key: number;
  label: string;
  path: string;
  icon: ReactElement;
};

const Manage: React.FC<Props> = (props) => {
  const history = useHistory();
  const path = usePath();

  const [channelNameModal, setChannelNameModal] = useState<boolean>(false);
  const [channelMoreModal, setChannelMoreModal] = useState<boolean>(false);
  const [uploadVideoModal, setUploadVideoModal] = useState<boolean>(false);

  const NavItems: navItems[] = [
    {
      key: 1,
      label: 'Videos',
      path: `/`,
      icon: <VideoCameraOutlined />,
    },
    {
      key: 2,
      label: 'Others',
      path: `/others`,
      icon: <VideoCameraOutlined />,
    },
  ];

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
              onClick={() => {
                setUploadVideoModal(true);
              }}
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
                          item.path ===
                          history.location.pathname.split('/manage')[1]
                            ? styles.active
                            : ''
                        }`}
                        key={item.key}
                        onClick={() => {
                          path(`/manage${item.path}`);
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
          <EditNameModal
            open={channelNameModal}
            openModal={() => {
              setChannelNameModal(true);
            }}
            closeModal={() => {
              setChannelNameModal(false);
            }}
          />
          <EditMoreModal
            open={channelMoreModal}
            openModal={() => {
              setChannelMoreModal(true);
            }}
            closeModal={() => {
              setChannelMoreModal(false);
            }}
          />
          <UploadVideoModal
            open={uploadVideoModal}
            openModal={() => {
              setUploadVideoModal(true);
            }}
            closeModal={() => {
              setUploadVideoModal(false);
            }}
          />
        </main>
      </div>
    </>
  );
};

export default Manage;
