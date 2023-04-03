import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { NavBar, SearchBar } from 'antd-mobile';
import { useState } from 'react';
import PostList from '@/components/PostList';
import { useIntl } from '@@/plugin-locale/localeExports';

type Props = {
  match: {
    params: {
      type: string;
    };
  };
};

const Search: React.FC<Props> = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const { type } = props.match.params;
  const [searchValue, setSearchValue] = useState<string>('');
  const [queryValue, serQueryValue] = useState<string>('');

  const getSearch = async () => {
    serQueryValue(searchValue);
  };

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        onBack={() => {
          history.goBack();
        }}
      >
        <div className={styles.row}>
          <SearchBar
            placeholder={`${intl.formatMessage({
              id: 'search.searchBar.searchInput',
            })}`}
            style={{
              '--border-radius': '20px',
              '--background': 'rgba(240,240,240,1)',
              '--height': '30px',
              '--placeholder-color': 'rgba(181, 181, 181, 1)',
            }}
            onChange={(val) => {
              setSearchValue(val);
            }}
          />
          <div className={styles.search} onClick={getSearch}>
            {intl.formatMessage({
              id: 'search.searchBar.text',
            })}
          </div>
        </div>
      </NavBar>

      <div className={styles.body}>
        {/*{isSearch ? (*/}
        {/*  type === 'latest' ? (*/}
        {/*    <div className={styles.latest}>*/}
        {/*      <PostList query={searchValue} />*/}
        {/*    </div>*/}
        {/*  ) : type === 'dao' ? (*/}
        {/*    <div className={styles.dao}>*/}
        {/*      <PostList query={searchValue} type={-1}/>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className={styles.chat}></div>*/}
        {/*  )*/}
        {/*) : (*/}
        {/*  <div className={styles.nobody}></div>*/}
        {/*)}*/}
        {type === 'latest' ? (
          queryValue ? (
            <PostList query={queryValue} type={'post'} />
          ) : (
            <></>
          )
        ) : queryValue ? (
          <PostList query={queryValue} type={-1} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
