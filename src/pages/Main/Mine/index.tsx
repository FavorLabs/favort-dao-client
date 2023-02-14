import * as React from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Mine: React.FC<Props> = (props) => {
  const history = useHistory();
  const { address } = useSelector((state: Models) => state.global);

  return (
    <>
      <div className={styles.content}>
        <button
          onClick={() => {
            history.push(`/dao/${address}/videos/manage`);
          }}
        >
          manage
        </button>
      </div>
    </>
  );
};

export default Mine;
