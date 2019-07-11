import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hnEndpoint, {
  STORY
} from 'Endpoints';
import { setBestStories } from 'Reducers/bestStories';
import { setTopStories } from 'Reducers/topStories';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case 'FETCH_FAILURE':
      return {
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

const setDispatch = {
  BEST_STORIES: setBestStories,
  TOP_STORIES: setTopStories
};

const defaultNumStories = 100;
const useHNstories = (storyCategory, limit = defaultNumStories) => {
  const storyDescription = storyCategory.description;
  const stories = useSelector(state => state[storyDescription]);
  const reDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    stories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await hnEndpoint(storyCategory);
      if (storyIds.error) return dispatch({ type: 'FETCH_FAILURE' });

      const limitedStoryIds = storyIds.slice(0, limit);
      const promises = limitedStoryIds.map(storyId => hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);

      const someErrors = results.some(result => result.error);
      if (someErrors) return dispatch({ type: 'FETCH_FAILURE' });

      reDispatch(setDispatch[storyDescription](results));
      return dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    if (stories && stories.length === 0) {
      fetchData();
    }
  }, [stories]);

  return { stories };
};


export default useHNstories;
