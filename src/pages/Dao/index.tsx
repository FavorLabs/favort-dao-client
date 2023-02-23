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
import { Models } from '@/declare/modelType';
import ReviteApi from '@/services/Revite';

type Props = {
  match: {
    params: {
      id: string;
    };
  };
  history: {
    location: {
      query: {
        tab: string;
      };
    };
  };
};

const Dao: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = useUrl();
  const verifyChannel = useVerifyChannel();
  const { id } = props.match.params;

  const { info } = useSelector((state: Models) => state.dao);
  const { web3 } = useSelector((state: Models) => state.web3);

  const [isBookmark, setIsBookmark] = useState(false);

  const [bookmarkModal, setBookmarkModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const getDaoInfo = async () => {
    const { data } = await DaoApi.getById(url, id);
    dispatch({
      type: 'dao/updateState',
      payload: {
        info: data.data,
      },
    });
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
    if (!info) return;
    if (data.data.status) {
      await ReviteApi.join(info.name);
    } else {
      const hash = web3?.utils.keccak256(`server_${info.name}`) as string;
      await ReviteApi.leave(hash.slice(2));
    }
  };

  useEffect(() => {
    getDaoInfo();
    checkBookmark();
    return () => {
      dispatch({
        type: 'dao/updateState',
        payload: {
          info: null,
        },
      });
    };
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
                src={info?.avatar || avatar_1}
                className={styles.userAvatar}
                style={{ backgroundColor: '#F44336' }}
              />
            </Divider>
          </div>
        </div>
        <div className={styles.daoTab}>
          {info && <DaoTab activeTab={props.history.location?.query?.tab} />}
        </div>
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
