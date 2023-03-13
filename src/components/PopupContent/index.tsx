import * as React from 'react';
import styles from './index.less';
import deleteImg from '@/assets/img/delete-icon.png';
import { useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';
import { Popup } from 'antd-mobile';
import { useState } from 'react';
import moreImg from '@/assets/img/more-img.png';
import quoteImg from '@/assets/img/quote-icon.png';
import reTransferImg from '@/assets/img/retransfer-icon.png';

export type Props = {
  post: PostInfo;
};

const PopupContent: React.FC<Props> = (props) => {
  const { post } = props;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { refreshPostList } = useSelector((state: Models) => state.manage);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const url = useUrl();
  const deleteFun = async () => {
    if (userInfo?.id === post.dao.id) {
      await PostApi.deletePost(url, post.id);
      dispatch({
        type: 'manage/updateState',
        payLoad: {
          refreshPostList: !refreshPostList,
        },
      });
      moreClick();
    }
  };

  const moreClick = () => {
    setVisible(!visible);
  };

  return (
    <div className={styles.page}>
      <div className={styles.more}>
        <img
          className={styles.moreImg}
          src={moreImg}
          alt=""
          onClick={moreClick}
        />
      </div>

      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: '40vh', borderRadius: '5px 5px 0 0' }}
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
              <img src={deleteImg} alt="" className={styles.img} />
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
    </div>
  );
};

export default PopupContent;
