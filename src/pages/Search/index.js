import React, { useState, useEffect, useReducer } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import styles from './styles.css'

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

const useDataAPI = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    const fetchData = async () => {
      // setIsError(false);
      // setIsLoading(true);
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });
        const results = await response.json();
        // setData({ hits: results.hits });
        dispatch({ type: 'FETCH_SUCCESS', payload: results.hits });
      } catch (err) {
        // setIsError(true);
        dispatch({ type: 'FETCH_FAILURE' });
      }

      // setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = url => setUrl(url);

  return { ...state, doFetch };
};

function Search() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doFetch } = useDataAPI(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <>
      {isError && <div>Something went wrong ...</div>}

      {isLoading
        ? (<div>Loading ...</div>)
        : (<ul className={styles.stories}>
            <li className={ styles.listTop }>
              <h2 className={ styles.searchTitle }>Search Hackner News</h2>
              <input
                className={ styles.searchInput }
                type="text"
                value={ query }
                onChange={ event => setQuery(event.target.value) } />
              <button className={ styles.searchButton } type="button" onClick={ () => doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`) }>
                Search
              </button>
            </li>
          {data.hits.map(item => {
            
            const url = new URL (item.url);
            const timeAgo = distanceInWordsToNow(item.created_at, { addSuffix: true });
            const userLink = `https://news.ycombinator.com/user?id=${item.author}`;
            const commentLink = `https://news.ycombinator.com/item?id=${item.objectID}`;
           
            return (
              <li key={ item.objectID } className={ styles.story }>
                <div>
                  <a className={styles.title} href={ item.url }>{ item.title } </a>
                </div>
                <div>
                  <span> { item.points } points </span>
                  <span> | <a href={ userLink }>{ item.author }</a> </span>
                  <span> | { timeAgo } </span>
                  <span> | <a href={ commentLink }>{ item.num_comments } comments</a> </span>
                  <span> | <a href={ 'http://' + url.hostname }>{ url.hostname }</a> </span>
                </div>  
              </li>
            )
          })}
        </ul>)
      }
    </>
  );
}


export default Search;
