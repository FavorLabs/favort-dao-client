import * as React from 'react';
import styles from './index.less';
import deleteImg from '@/assets/img/delete-icon.png';
import { useDispatch, useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfo } from '@/declare/tubeApiType';

export type Props = {
  handle: () => void;
  post: PostInfo;
};

const PopupContent: React.FC<Props> = (props) => {
  const { handle, post } = props;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const { refreshPostList } = useSelector((state: Models) => state.manage);
  const dispatch = useDispatch();
  const url = useUrl();
  const deleteFun = async () => {
    if (userInfo?.id === post.dao.id) {
      await PostApi.deletePost(url, post.id);
      handle();
      dispatch({
        type: 'manage/updateState',
        payLoad: {
          refreshPostList: !refreshPostList,
        },
      });
    }
  };
  return (
    <div className={styles.page}>
      {userInfo?.id === post.dao.id ? (
        <div className={styles.row} onClick={deleteFun}>
          <img src={deleteImg} alt="" className={styles.img} />
          <span className={styles.text}>Delete</span>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.cancel} onClick={handle}>
        Cancel
      </div>
    </div>
  );
};

export default PopupContent;
