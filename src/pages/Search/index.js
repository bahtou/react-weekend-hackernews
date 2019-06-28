import React from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import useDataAPI from '../../hooks/useDataAPI';


function Search() {
  const { data, isLoading, isError, doFetch } = useDataAPI(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <>
      <SearchBar doFetch={doFetch} />

      {isLoading
        ? (<div>Loading ...</div>)
        : (isError
          ? <div>Something went wrong ...</div>
          : <SearchList data={data} />
        )
      }
    </>
  );
}


export default Search;
