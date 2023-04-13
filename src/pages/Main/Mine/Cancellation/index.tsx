import * as React from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import { useHistory, useParams } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';
import backIcon from '@/assets/icon/back-icon.svg';
import { useEffect, useState } from 'react';
import cancellationSuccess from '@/assets/icon/cancellation-success.svg';
import cancellationFailed from '@/assets/icon/noToken-icon.svg';

type Props = {};

const CancellationSuccess: React.FC<Props> = (props) => {
  const { state } = useParams<{ state: string }>();
  const history = useHistory();
  const intl = useIntl();

  const [isState, setIsState] = useState<boolean>(false);

  const confirmHandle = () => {
    if (isState) {
      history.replace('/');
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    if (state === 'true') {
      setIsState(true);
    }
  }, []);

  return (
    <div className={styles.cancellationSuccess}>
      <NavBar
        className={styles.navBar}
        backArrow={
          <img src={backIcon} alt={'backIcon'} className={styles.backIcon} />
        }
        onBack={() => {
          if (isState) {
            history.replace('/');
          } else {
            history.goBack();
          }
        }}
      >
        {intl.formatMessage({
          id: 'cancellation.navBar.title',
        })}
      </NavBar>

      <div className={styles.content}>
        <div className={styles.block}>
          <img
            src={isState ? cancellationSuccess : cancellationFailed}
            alt=""
            className={styles.image}
          />
          <p className={styles.text}>
            {isState
              ? `${intl.formatMessage({
                  id: 'cancellation.accountSuccess',
                })}`
              : `${intl.formatMessage({
                  id: 'cancellation.accountFailed',
                })}`}
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.button} onClick={confirmHandle}>
          {intl.formatMessage({
            id: 'cancellation.confirm',
          })}
        </div>
      </div>
    </div>
  );
};

export default CancellationSuccess;
