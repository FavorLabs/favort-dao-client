import * as React from 'react';
import styles from './index.less';
import { Avatar, Button, Row, Col, Layout, Menu } from 'antd';
const { Sider } = Layout;
import {
  UploadOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { usePath } from '@/utils/hooks';
import { isMobile } from '@/utils/util';
import { history } from 'umi';
import EditNameModal from '@/components/EditNameModal';
import EditMoreModal from '@/components/EditMoreModal';
import UploadVideoModal from '@/components/UploadVideoModal';

export type Props = {};

const Manage: React.FC<Props> = (props) => {
  const path = usePath();

  const [collapsed, setCollapsed] = useState(false);
  const [channelNameModal, setChannelNameModal] = useState<boolean>(false);
  const [channelMoreModal, setChannelMoreModal] = useState<boolean>(false);
  const [uploadVideoModal, setUploadVideoModal] = useState<boolean>(false);

  const NavItems = [
    {
      key: '1',
      label: 'Videos',
      icon: <VideoCameraOutlined />,
      onClick: () => {
        path('/manage');
        isMobile() ? setCollapsed(true) : '';
      },
    },
    {
      key: '2',
      label: 'Others',
      icon: <VideoCameraOutlined />,
      onClick: () => {
        path('/manage/others');
        isMobile() ? setCollapsed(true) : '';
      },
    },
  ];

  return (
    <>
      <div className={`${styles.content} pageContent`}>
        <header className={'header'}>
          <div className={styles.topBar}>
            <div className={styles.logo}>
              <span>FavorTube</span>
              <MenuOutlined
                className={styles.switchMenu}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              />
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
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className={styles.aside}
              breakpoint="xl"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                setCollapsed(broken);
              }}
              onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
              }}
            >
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
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={NavItems}
              />
            </Sider>
            <Layout className="site-layout">
              <article>{props.children}</article>
            </Layout>
          </Layout>
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
