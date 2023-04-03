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
import { useIntl } from '@@/plugin-locale/localeExports';

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
  const [isClick, setIsClick] = useState<boolean>(true);
  const intl = useIntl();

  const confirmHandle = async () => {
    try {
      setIsClick(false);
      handle();
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDialogVisible(false);
    }
  };

  const joinCommunity = () => {
    if (isClick) {
      setIsClick(false);
      try {
        handle();
      } catch (e) {
        if (e instanceof Error) message.error(e.message);
      } finally {
      }
    } else {
      message.warning(
        `${intl.formatMessage({
          id: 'dao.communityCard.message.warning',
        })}`,
      );
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
                  className={`${!isClick ? styles.joining : styles.joined}`}
                  onClick={() => {
                    isClick
                      ? setDialogVisible(true)
                      : message.warning(
                          `${intl.formatMessage({
                            id: 'dao.communityCard.message.warning',
                          })}`,
                        );
                  }}
                >
                  {intl.formatMessage({
                    id: 'dao.communityCard.joined',
                  })}
                </div>
              ) : (
                <div
                  className={`${!isClick ? styles.joining : styles.join}`}
                  onClick={joinCommunity}
                >
                  {intl.formatMessage({
                    id: 'dao.communityCard.join',
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
      <ExitCommunityDialog
        text={`${intl.formatMessage({
          id: 'dao.communityCard.exitCommunityDialog.text',
        })}`}
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
