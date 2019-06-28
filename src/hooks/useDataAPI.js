import React, { useState, useEffect, useReducer } from 'react';

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
          data: action.payload
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
        dispatch({ type: 'FETCH_INIT' });

        try {
            const response = await fetch(url, { method: 'GET', mode: 'cors' });
            const results = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: results });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE' });
        }
        };

        fetchData();
    }, [url]);

    const doFetch = url => setUrl(url);

    return { ...state, doFetch };
};

export default useDataAPI;