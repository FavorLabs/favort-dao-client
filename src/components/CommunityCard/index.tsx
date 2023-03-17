import * as React from 'react';
import styles from './index.less';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { useEffect, useState } from 'react';
import SvgIcon from '@/components/SvgIcon';
import joinedImg from '@/assets/icon/joinedNumber.svg';
import arrow from '@/assets/img/arrow.png';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import { message } from 'antd';
import { ImageSize } from '@/config/constants';

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
              daoInfo?.banner + ImageSize
            })`,
            backgroundSize: `100%`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
          }}
        ></div>
        <div className={`${styles.bottom}`}>
          <div className={styles.top}>
            <div className={styles.left}>
              <p className={styles.name}>{daoInfo?.name}</p>
              <div className={styles.joinedNumber}>
                <div className={styles.svg}>
                  <SvgIcon svg={joinedImg} />
                </div>
                <span className={styles.text}>{daoInfo?.follow_count}</span>
              </div>
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

            <div className={styles.right}>
              <img
                src={arrow}
                className={`${isUnfold ? styles.upward : styles.down}`}
                onClick={() => setIsUnfold(!isUnfold)}
              />
            </div>
          </div>

          {isUnfold ? (
            <div className={styles.introduction}>{daoInfo?.introduction}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ExitCommunityDialog
        text={'Confirm your withdrawal from this community?'}
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
