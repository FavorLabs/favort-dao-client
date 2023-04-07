import * as React from 'react';
import styles from './index.less';
import { Mask } from 'antd-mobile';
import { Image } from 'antd';
import { ImageMaxSize, ImageMidSize } from '@/config/constants';
import { useResourceUrl } from '@/utils/hooks';
import { useState } from 'react';

export type Props = {
  imgUrl: string;
  isOneImg: boolean;
};

const ImageCut: React.FC<Props> = (props) => {
  const { imgUrl, isOneImg } = props;
  const imagesResUrl = useResourceUrl('images');
  return (
    <div className={styles.page}>
      {isOneImg ? (
        <div className={styles.imageMax}>
          <Image
            src={`${imagesResUrl}/${imgUrl + ImageMaxSize}`}
            className={styles.imgMaxUrl}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      ) : (
        <div className={styles.image}>
          <Image
            src={`${imagesResUrl}/${imgUrl + ImageMidSize}`}
            className={styles.imgUrl}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCut;
