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
import CommunityInfo from '@/components/CommunityInfo';

export type Props = {
  post: PostInfo;
};

const VideoQuoteBlock: React.FC<Props> = (props) => {
  const { orig_contents, author_dao, created_on } = props.post;
  const history = useHistory();
  const info = getContent(orig_contents);
  const imagesResUrl = useResourceUrl('images');
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];

  const toDetail = () => {
    if (route !== 'newsletterDetail') {
      history.push(`/video/${props.post.ref_id}`);
    }
  };

  return (
    <div className={styles.container}>
      <CommunityInfo daoInfo={author_dao} createTime={created_on} />

      <div className={styles.bottom} onClick={toDetail}>
        <div className={styles.title}>{info?.[1]?.[0]?.content}</div>

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
    </div>
  );
};

export default VideoQuoteBlock;
