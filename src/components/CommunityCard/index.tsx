import * as React from 'react';
import styles from './index.less';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { useEffect, useState } from 'react';
import SvgIcon from '@/components/SvgIcon';
import joinedImg from '@/assets/icon/joinedNumber.svg';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import { message } from 'antd';
import { ImageMaxSize } from '@/config/constants';

export type Props = {
  status: boolean;
  handle: () => void;
  daoInfo: DaoInfo | undefined;
};

const CommunityCard: React.FC<Props> = (props) => {
  const { status, handle, daoInfo } = props;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const imagesResUrl = useResourceUrl('images');
  const [isUnfold, setIsUnfold] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const confirmHandle = async () => {
    try {
      handle();
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDialogVisible(false);
    }
  };

  useEffect(() => {
    setIsUnfold(false);
  }, [daoInfo]);

  return (
    <div className={styles.page}>
      <div className={`${styles.content} ${isUnfold ? styles.height : ''}`}>
        <div
          className={styles.bg}
          style={{
            backgroundImage: `url(${imagesResUrl}/${
              daoInfo?.banner + ImageMaxSize
            })`,
            backgroundSize: `100%`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
          }}
        />
        <div className={`${styles.box}`}>
          <div className={styles.top}>
            <p className={styles.leftName}>{daoInfo?.name}</p>

            <div className={styles.right}>
              <div className={styles.joinedNumber}>
                <div className={styles.svg}>
                  <img src={joinedImg} alt="" className={styles.img} />
                </div>
                <span className={styles.text}>{daoInfo?.follow_count}</span>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.introduction}>{daoInfo?.introduction}</p>

            {daoInfo?.id !== userInfo?.id &&
              (status ? (
                <div
                  className={styles.joined}
                  onClick={() => {
                    setDialogVisible(true);
                  }}
                >
                  joined
                </div>
              ) : (
                <div className={styles.join} onClick={handle}>
                  join
                </div>
              ))}
          </div>
        </div>
      </div>
      <ExitCommunityDialog
        text={'Confirm your withdrawal from this DAO?'}
        visible={dialogVisible}
        closeDialog={() => {
          setDialogVisible(false);
        }}
        confirmHandle={confirmHandle}
      />
    </div>
  );
};

export default CommunityCard;
