import * as React from 'react';
import styles from './index.less';
import moreIcon from '@/assets/icon/moreIcon.svg';
import deleteIcon from '@/assets/icon/delete-icon.svg';
import { useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';
import { Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import DaoApi from '@/services/tube/Dao';
import { message } from 'antd';
import { history } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
};

const PopupContent: React.FC<Props> = (props) => {
  const { post, refreshPage, delPost } = props;
  const intl = useIntl();
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { refreshPostList } = useSelector((state: Models) => state.manage);
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [moreVisible, setMoreVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const url = useUrl();
  const pathname = history.location.pathname;

  const deleteFun = async () => {
    moreClick();
    setDialogVisible(true);
  };

  const confirmHandle = async () => {
    setDialogVisible(false);
    try {
      const { data } = await PostApi.deletePost(url, post.id);
      if (data.msg === 'success') {
        message.success(
          `${intl.formatMessage({
            id: 'popupContent.delete.messageSuccess',
          })}`,
        );
        delPost?.(post.id);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
    // finally {
    //   setDialogVisible(false);
    // }
  };

  const moreClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (!pathname.includes('/newsletterDetail')) setMoreVisible(true);
  }, [pathname]);

  return (
    <div className={styles.page}>
      <div className={styles.more}>
        {moreVisible && (
          <img
            className={styles.moreImg}
            src={moreIcon}
            alt=""
            onClick={moreClick}
          />
        )}
      </div>

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
        }}
      >
        <div className={styles.popupPage}>
          {/*<div className={styles.row}>*/}
          {/*  <img src={deleteIcon} alt="" className={styles.img} />*/}
          {/*  <span className={styles.text}>ReTransfer</span>*/}
          {/*</div>*/}
          {/*<div className={styles.row}>*/}
          {/*  <img src={deleteIcon} alt="" className={styles.img} />*/}
          {/*  <span className={styles.text}>Quote</span>*/}
          {/*</div>*/}
          {userInfo?.id === post.dao.id ? (
            <div className={styles.row} onClick={deleteFun}>
              <img src={deleteIcon} alt="" className={styles.img} />
              <span className={styles.redText}>
                {intl.formatMessage({
                  id: 'popupContent.delete',
                })}
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.cancel} onClick={moreClick}>
            {intl.formatMessage({
              id: 'popupContent.cancel',
            })}
          </div>
        </div>
      </Popup>
      <ExitCommunityDialog
        text={`${intl.formatMessage({
          id: 'popupContent.exitCommunityDialog.text',
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

export default PopupContent;
