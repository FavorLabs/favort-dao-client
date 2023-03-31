import * as React from 'react';
import styles from './index.less';
import TopNavBar from '@/components/TopNavBar';
import QRCode from 'qrcode.react';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { omitAddress } from '@/utils/util';
import avatarSvg from '@/assets/icon/setting-avatar.svg';

export type Props = {};
const QrCode: React.FC<Props> = (props) => {
  const { address } = useSelector((state: Models) => state.web3);

  return (
    <div className={styles.qrCode}>
      <TopNavBar title={'QR Code'} right={null} />
      {address && (
        <div className={styles.qrCodeWrap}>
          <div className={styles.address}>{omitAddress(address, 6, 14)}</div>
          <div className={styles.QRCode}>
            <QRCode
              className={styles.code}
              value={address}
              size={180}
              imageSettings={{
                src: avatarSvg,
                height: 54,
                width: 54,
                excavate: true,
              }}
            />
          </div>
          <div className={styles.tips}>Scan to send tokens</div>
        </div>
      )}
    </div>
  );
};

export default QrCode;
