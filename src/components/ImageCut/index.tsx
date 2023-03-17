import * as React from 'react';
import styles from './index.less';
import { Mask } from 'antd-mobile';
import { Image } from 'antd';
import { ImageSize } from '@/config/constants';
import { useResourceUrl } from '@/utils/hooks';
import { useState } from 'react';

export type Props = {
  imgUrl: string;
};

const ImageCut: React.FC<Props> = (props) => {
  const { imgUrl } = props;
  const imagesResUrl = useResourceUrl('images');
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.page}>
      <div className={styles.image}>
        <Image
          src={`${imagesResUrl}/${imgUrl + ImageSize}`}
          className={styles.imgUrl}
        />
      </div>
    </div>
  );
};

export default ImageCut;
