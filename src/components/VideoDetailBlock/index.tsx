import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import { useIntl } from '@@/plugin-locale/localeExports';
import { useHistory, useSelector } from 'umi';
import { useResourceUrl } from '@/utils/hooks';
import { getContent } from '@/utils/util';
import { Models } from '@/declare/modelType';
import { ImageMaxSize } from '@/config/constants';
import playImg from '@/assets/icon/play-icon.svg';
import { history } from '@@/core/history';

export type Props = {
  post: PostInfo;
  isReTransfer?: boolean;
  isQuote?: boolean;
};

const VideoDetailBlock: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { contents, orig_contents, author_dao } = props.post;
  const { isReTransfer, isQuote } = props;
  const history = useHistory();
  const info = getContent(isReTransfer ? orig_contents : contents);
  const imagesResUrl = useResourceUrl('images');
  const { userInfo } = useSelector((state: Models) => state.dao);
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];

  const toDetail = () => {
    if (route !== 'newsletterDetail') {
      if (props.post.type === 3) {
        history.push(`/video/${props.post.ref_id}`);
      } else {
        history.push(`/video/${props.post.id}`);
      }
    }
  };

  return (
    <>
      <div className={styles.bottom} onClick={toDetail}>
        <div className={styles.title}>
          <span
            className={styles.daoName}
            // onClick={(e) => {
            //  e.preventDefault();
            //   history.push(`/daoCommunity/${author_dao.id}`);
            // }}
          >
            {isQuote && `@${author_dao.name}`}
          </span>
          {info?.[1]?.[0]?.content}
        </div>

        <div
          className={styles.bg}
          style={{
            backgroundImage: `url(${imagesResUrl}/${
              info?.[3]?.[0]?.content + ImageMaxSize
            })`,
            backgroundSize: `100%`,
            backgroundPosition: `center center`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <img src={playImg} className={styles.play} />
        </div>
      </div>
    </>
  );
};

export default VideoDetailBlock;
