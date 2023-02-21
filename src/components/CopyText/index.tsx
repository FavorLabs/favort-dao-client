import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Tooltip } from 'antd';
import styles from './index.less';
import copySvg from '@/assets/icon/copy.svg';
import SvgIcon from '@/components/SvgIcon';

export type Props = {
  text: string;
  callback?: () => void;
};
const CopyText: React.FC<Props> = (props) => {
  const copyHandle = (): void => {
    message.success('Copy Success');
    props.callback ? props.callback() : '';
  };
  return (
    <>
      <CopyToClipboard text={props.text} onCopy={copyHandle}>
        <Tooltip title="copy" key={'copy'}>
          {props.children ? (
            props.children
          ) : (
            <span className={styles.iconColor}>
              <SvgIcon svg={copySvg} />
            </span>
          )}
        </Tooltip>
      </CopyToClipboard>
    </>
  );
};
export default CopyText;
