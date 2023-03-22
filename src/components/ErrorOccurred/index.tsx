import * as React from 'react';
import styles from './index.less';

export type Props = {
  retryFn: () => void;
};
const ErrorOccurred: React.FC<Props> = (props) => {
  const { retryFn } = props;

  return (
    <div className={styles.errorOccurred}>
      <p className={styles.tips}>
        Something went wrong, but don’t fret — let’s give it another shot.
      </p>
      <div className={styles.action}>
        <span
          className={styles.retryBtn}
          onClick={() => {
            retryFn?.();
          }}
        >
          Take action
        </span>
      </div>
    </div>
  );
};

export default ErrorOccurred;
