import * as React from 'react';
import styles from './index.less';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useHistory, useSelector } from 'umi';
import { Avatar, message, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/svgIcon';
import avatar_1 from '@/assets/img/avatar_1.png';
import newsletterSvg from '@/assets/icon/newsletter.svg';
import videoSvg from '@/assets/icon/video.svg';
import daoSvg from '@/assets/icon/dao.svg';
import bookmarkSvg from '@/assets/icon/bookmark.svg';
import { useUrl, useVerifyChannel } from '@/utils/hooks';
import { Models } from '@/declare/modelType';
import Loading from '@/components/Loading';
import DaoTab from '@/components/DaoTab';

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
};
const Dao: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = useUrl();
  const verifyChannel = useVerifyChannel();
  const { address } = props.match.params;

  const [subModal, setSubModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const { api } = useSelector((state: Models) => state.global);

  const menuItems: MenuItem[] = [
    {
      key: 1,
      title: 'Newsletter',
    },
    {
      key: 2,
      title: 'Newsletter',
    },
    {
      key: 3,
      title: 'Videos',
    },
    {
      key: 4,
      title: 'Group',
    },
  ];

  useEffect(() => {}, [props.match.params.address]);

  return (
    <>
      <div className={styles.content}>
        {loading ? (
          <Loading text={'Loading data'} status={loading} />
        ) : (
          <>
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
                <span className={styles.daoName}>
                  {props.history.location.query.daoName}web3888899999999
                </span>
                {!verifyChannel && (
                  <span
                    className={styles.bookmark}
                    onClick={() => {
                      setSubModal(true);
                    }}
                  >
                    <SvgIcon svg={bookmarkSvg} />
                    &nbsp;bookmark
                  </span>
                )}
              </div>
              <div className={styles.daoDesc}>
                <p className={styles.desc}>
                  看的比较准还比较有意思的狗哥。主要关注中国与这个世界的交往，台湾，香港，新疆，狗狗，美食，五毛。。。。。。FC
                  Barcelona，Arsenal FC，AC Milan，Dortmund。。。。。。
                  【我爱问狗哥】email：chinattj@gmail.com
                  Patreon会员订阅：https://www.patreon.com/dogchinashow
                  欢迎支持狗粮：paypal.me/gougeNB
                </p>
                <Divider orientation="right" className={styles.avatar}>
                  <Avatar
                    size={24}
                    alt=""
                    src={avatar_1}
                    className={styles.userAvatar}
                    style={{ backgroundColor: '#F44336' }}
                  />
                </Divider>
              </div>
            </div>
            <DaoTab />
          </>
        )}
      </div>
    </>
  );
};

export default Dao;
