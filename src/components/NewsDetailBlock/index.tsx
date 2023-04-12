import * as React from 'react';
import styles from './index.less';
import { PostInfo } from '@/declare/tubeApiType';
import ImageCut from '@/components/ImageCut';
import { getContent } from '@/utils/util';
import { history, useHistory, useSelector } from 'umi';
import { useIntl } from '@@/plugin-locale/localeExports';

export type Props = {
  post: PostInfo;
  isReTransfer?: boolean;
  isQuote?: boolean;
};

const newsDetailBlock: React.FC<Props> = (props) => {
  const { isReTransfer, isQuote } = props;
  const { contents, id, orig_contents, author_dao, ref_id } = props.post;
  const info = getContent(isReTransfer ? orig_contents : contents);
  const pathname = history.location.pathname;
  const route = pathname.split('/')[1];
  const intl = useIntl();

  const toDetail = () => {
    if (route !== 'newsletterDetail') {
      if (props.post.type === 3) {
        history.push(`/newsletterDetail/${ref_id}`);
      } else {
        history.push(`/newsletterDetail/${id}`);
      }
    }
  };

  return (
    <>
      <div
        className={`${
          route !== 'newsletterDetail' && info[2]?.[0]?.content?.length > 116
            ? styles.textInfo
            : styles.detail
        }`}
        onClick={toDetail}
      >
        <span
          className={styles.daoName}
          // onClick={(e) => {
          //   history.push(`/daoCommunity/${author_dao.id}`);
          //   e.preventDefault();
          // }}
        >
          {isQuote && `@${author_dao.name}`}
        </span>
        {info[2]?.[0]?.content}
        {info[2]?.[0]?.content?.length > 116 &&
          route !== 'newsletterDetail' && (
            <div className={styles.toMore}>
              {intl.formatMessage({
                id: 'graphicMessage.more',
              })}
            </div>
          )}
      </div>

      <div
        className={`${
          info[3]?.length !== 2 ? styles.mediumInfo : styles.twoImage
        } mediumInfo`}
        onClick={(e) => {
          const element = e.target;
          if (element instanceof HTMLElement) {
            if (element.className.includes('mediumInfo')) {
              toDetail;
            }
          }
        }}
      >
        {info[3]?.map((item: any, index: number) => (
          <div key={index} className={styles.block}>
            {info[3]?.length === 1 ? (
              <ImageCut imgUrl={item.content} isOneImg={true} />
            ) : (
              <ImageCut imgUrl={item.content} isOneImg={false} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default newsDetailBlock;
