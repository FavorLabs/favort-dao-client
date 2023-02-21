import * as React from 'react';
import styles from './index.less';
import ChannelHome from '@/components/ChannelHome';
import UploadVideoModal from '@/components/UploadVideoModal';
import { useState } from 'react';
import { Button } from 'antd';

type Props = {};
const Videos: React.FC<Props> = (props) => {
  const [uploadVideoModal, setUploadVideoModal] = useState<boolean>(false);

  return (
    <>
      <div className={styles.content}>
        <main className={styles.main}>
          <div className={styles.channelInfo}>
            <div className={styles.uploadVideo}>
              <Button
                type={'primary'}
                onClick={() => setUploadVideoModal(true)}
              >
                Upload Video
              </Button>
            </div>
            <ChannelHome />
          </div>
        </main>
        {uploadVideoModal && (
          <UploadVideoModal
            open={uploadVideoModal}
            openModal={() => {
              setUploadVideoModal(true);
            }}
            closeModal={() => {
              setUploadVideoModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Videos;
