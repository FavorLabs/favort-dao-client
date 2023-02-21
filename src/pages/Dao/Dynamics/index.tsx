import * as React from 'react';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import NewsletterCard from '@/components/NewsletterCard';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';

export type Props = {};
const Dynamics: React.FC<Props> = (props) => {
  const url = useUrl();

  const [dynamicsList, setDynamicsList] = useState([]);

  const getList = async () => {
    const { data } = await postApi.getPostListByAddress(
      url,
      '0xE28E429D3616Bb77Bee108FF943030B3311b4Ec3',
    );
    if (data.data) {
      setDynamicsList(data.data.list);
    }
  };
  console.log('dynamicsList', dynamicsList);

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <>
        {dynamicsList.map((item, index) => (
          <div key={index}>
            <NewsletterCard cardData={item} />
          </div>
        ))}
      </>
    </>
  );
};

export default Dynamics;
