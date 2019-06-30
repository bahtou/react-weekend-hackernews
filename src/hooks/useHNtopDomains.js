import { useEffect, useReducer } from 'react';

import useHNtopStories from './useHNtopStories';
import getTopDomainsFromStories from './getTopDomainsFromStories';


const reducer = (state, action) => {
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
        domains: action.payload
      };
    case 'FETCH_FAILURE':
      return { ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

const useHNtopDomains = () => {
  const { isLoading:initLoading, isError:initError, stories } = useHNtopStories(100);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    domains: []
  });

  useEffect(() => {
    const _domains = getTopDomainsFromStories(stories);

    dispatch({ type: 'FETCH_SUCCESS', payload: _domains });
  }, [stories]);

  return {
    isLoading: initLoading || state.isLoading,
    isError: initError || state.isError,
    domains: state.domains
  };
};


export default useHNtopDomains;
