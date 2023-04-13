import * as React from 'react';
import styles from './index.less';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { useEffect, useState } from 'react';
import { useIntl } from '@@/plugin-locale/localeExports';
import { message } from 'antd';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import DaoApi from '@/services/tube/Dao';
import { useUrl } from '@/utils/hooks';
import { checkLogin, getDebounce } from '@/utils/util';

type Props = {
  status?: boolean;
  handle?: () => void;
  isRefresh?: boolean;
  daoId?: any;
};

const JoinButton: React.FC<Props> = (props) => {
  const intl = useIntl();
  const url = useUrl();
  const { status, handle, isRefresh, daoId } = props;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(true);
  const [joined, setJoined] = useState<boolean>(false);
  const loginStatus = checkLogin();

  const joinCommunity = () => {
    if (isClick) {
      setIsClick(false);
      try {
        if (isRefresh) {
          joinDao();
        } else {
          handle?.();
        }
      } catch (e) {
        if (e instanceof Error) message.error(e.message);
      }
    } else {
      message.warning(
        `${intl.formatMessage({
          id: 'joinButton.message.warning',
        })}`,
      );
    }
  };

  const confirmHandle = async () => {
    try {
      setIsClick(false);
      if (isRefresh) {
        joinDao();
      } else {
        handle?.();
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDialogVisible(false);
    }
  };

  const checkJoinStatus = async (id: string) => {
    const { data } = await DaoApi.checkBookmark(url, id);
    if (data.data) {
      setJoined(data.data.status);
    }
  };

  const joinDao = async () => {
    try {
      const { data } = await DaoApi.bookmark(url, daoId);
      if (data.data) {
        setJoined(data.data.status);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  useEffect(() => {
    if (isRefresh && loginStatus) {
      checkJoinStatus(daoId);
    } else {
      if (status) {
        setJoined(status);
      }
    }
  }, []);

  useEffect(() => {
    setIsClick(true);
  }, [joined]);

  return (
    <div>
      {joined ? (
        <div
          className={`${!isClick ? styles.joining : styles.joined}`}
          onClick={() => {
            isClick
              ? setDialogVisible(true)
              : message.warning(
                  `${intl.formatMessage({
                    id: 'joinButton.message.warning',
                  })}`,
                );
          }}
        >
          {intl.formatMessage({
            id: 'joinButton.joined',
          })}
        </div>
      ) : (
        <div
          className={`${!isClick ? styles.joining : styles.join}`}
          onClick={joinCommunity}
        >
          {intl.formatMessage({
            id: 'joinButton.join',
          })}
        </div>
      )}
      <ExitCommunityDialog
        text={`${intl.formatMessage({
          id: 'joinButton.exitCommunityDialog.text',
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

export default JoinButton;
