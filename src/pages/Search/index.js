import React, { useState, useEffect, useReducer } from 'react';

import hnEndpoint, {
  SEARCH
} from 'Endpoints';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import useDataAPI from '../../hooks/useDataAPI';


const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        data: { hits: action.payload }
      };
    case 'FETCH_FAILURE':
      return { ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataAPI = (initQuery, initData) => {
  const [query, setQuery] = useState(initQuery);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      const results = await hnEndpoint(SEARCH, query);
      if (results.error) return dispatch({ type: 'FETCH_FAILURE' });

      dispatch({ type: 'FETCH_SUCCESS', payload: results.hits });
    };

    fetchData();
  }, [query]);

  const doFetch = query => setQuery(query);

  return { ...state, doFetch };
};

function Search() {
  const { data, isLoading, isError, doFetch } = useDataAPI(
    'redux',
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
