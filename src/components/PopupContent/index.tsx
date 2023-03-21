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
import moreImg from '@/assets/img/more-img.png';
import ExitCommunityDialog from '@/components/ExitCommunityDialog';
import DaoApi from '@/services/tube/Dao';
import { message } from 'antd';
import { history } from 'umi';

export type Props = {
  post: PostInfo;
  refreshPage: () => void;
  delPost?: (post: string) => void;
};

const PopupContent: React.FC<Props> = (props) => {
  const { post, refreshPage, delPost } = props;
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
    try {
      const { data } = await PostApi.deletePost(url, post.id);
      if (data.msg === 'success') {
        // dispatch({
        //   type: 'dao/updateState',
        //   payLoad: {
        //     refreshPostList: !refreshPostList,
        //   },
        // });
        // refreshPage();
        delPost?.(post.id);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDialogVisible(false);
    }
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
          padding: '20px',
          boxSizing: 'border-box',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      >
        <div className={styles.popupPage}>
          {/*<div className={styles.row}>*/}
          {/*  <img src={reTransferImg} alt="" className={styles.img} />*/}
          {/*  <span className={styles.text}>ReTransfer</span>*/}
          {/*</div>*/}
          {/*<div className={styles.row}>*/}
          {/*  <img src={quoteImg} alt="" className={styles.img} />*/}
          {/*  <span className={styles.text}>Quote</span>*/}
          {/*</div>*/}
          {userInfo?.id === post.dao.id ? (
            <div className={styles.row} onClick={deleteFun}>
              <img src={deleteIcon} alt="" className={styles.img} />
              <span className={styles.redText}>Delete</span>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.cancel} onClick={moreClick}>
            Cancel
          </div>
        </div>
      </Popup>
      <ExitCommunityDialog
        text={'Are you sure you want to delete this News?'}
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
