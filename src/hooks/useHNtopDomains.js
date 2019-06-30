import { useEffect, useReducer } from 'react';

import useHNStories from './useHNStories';
import getTopDomainsFromStories from '../utils/getTopDomainsFromStories';
import { BEST_STORIES } from '../endpoints';

const useHNtopDomains = () => {
  const { isLoading, isError, stories } = useHNStories(BEST_STORIES, 100);

  return {
    isLoading: isLoading,
    isError: isError,
    domains: getTopDomainsFromStories(stories)
  };
};


export default useHNtopDomains;
