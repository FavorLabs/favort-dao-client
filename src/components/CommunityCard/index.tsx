import * as React from 'react';
import styles from './index.less';
import { DaoInfo } from '@/declare/tubeApiType';
import { useResourceUrl } from '@/utils/hooks';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { useEffect, useState } from 'react';

export type Props = {
  status: boolean;
  handle: () => void;
  daoInfo: DaoInfo | undefined;
};

const CommunityCard: React.FC<Props> = (props) => {
  const { status, handle, daoInfo } = props;
  const { userInfo } = useSelector((state: Models) => state.dao);
  const imagesResUrl = useResourceUrl('images');

  return (
    <div className={styles.page}>
      <div
        className={styles.content}
        style={{
          backgroundImage: `url(${imagesResUrl}/${daoInfo?.banner})`,
          backgroundSize: `100%`,
          backgroundPosition: `center center`,
        }}
      >
        <div className={styles.bottom}>
          <p className={styles.textLeft}>{daoInfo?.introduction}</p>
          {daoInfo?.id !== userInfo?.id &&
            (status ? (
              <div className={styles.joined}>joined</div>
            ) : (
              <div className={styles.join} onClick={handle}>
                join
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
