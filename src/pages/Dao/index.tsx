import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useHistory, useSelector } from 'umi';
import { Avatar, message, Divider, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';
import avatar_1 from '@/assets/img/avatar_1.png';
import bookmarkSvg from '@/assets/icon/bookmark.svg';
import { useUrl, useVerifyChannel } from '@/utils/hooks';
import DaoTab from '@/components/DaoTab';
import DaoApi from '@/services/tube/Dao';
import { DaoInfo } from '@/declare/tubeApiType';

type Props = {
  match: {
    params: {
      id: string;
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
  const { id } = props.match.params;

  const [info, setInfo] = useState<DaoInfo>();
  const [isBookmark, setIsBookmark] = useState(false);

  const [bookmarkModal, setBookmarkModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const getDaoInfo = async () => {
    const { data } = await DaoApi.getById(url, id);
    setInfo(data.data);
  };
  const checkBookmark = async () => {
    const { data } = await DaoApi.checkBookmark(url, id);
    setIsBookmark(data.data.status);
  };

  const bookmark = async () => {
    setLoading(true);
    const { data } = await DaoApi.bookmark(url, id);
    setIsBookmark(data.data.status);
    setLoading(false);
    setBookmarkModal(false);
    message.success('Success');
  };

  useEffect(() => {
    getDaoInfo();
    checkBookmark();
  }, [id]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.topBar}>
          <div className={styles.action}>
            <span
              className={styles.goBack}
              onClick={() => {
                history.push('/main/daoList');
              }}
            >
              <ArrowLeftOutlined />
            </span>
            <span className={styles.daoName}>{info?.name}</span>
            {!verifyChannel && (
              <span
                className={styles.bookmark}
                onClick={() => {
                  setBookmarkModal(true);
                }}
              >
                {isBookmark && <SvgIcon svg={bookmarkSvg} />}
                &nbsp;bookmark
              </span>
            )}
          </div>
          <div className={styles.daoDesc}>
            <p className={styles.desc}>{info?.introduction}</p>
            <Divider orientation="right" className={styles.avatar}>
              <Avatar
                size={24}
                alt=""
                src={info?.avatar}
                className={styles.userAvatar}
                style={{ backgroundColor: '#F44336' }}
              />
            </Divider>
          </div>
        </div>
        <DaoTab />
        <Modal
          title="Bookmark"
          centered
          confirmLoading={loading}
          open={bookmarkModal}
          onOk={bookmark}
          onCancel={() => setBookmarkModal(false)}
        >
          <p>Sure to {isBookmark && 'cancel'} bookmark?</p>
        </Modal>
      </div>
    </>
  );
};

export default Dao;
