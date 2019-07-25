import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hnEndpoint, {
  STORY
} from 'Endpoints';
import { setBestStories, setTopStories } from 'Reducers/stories';


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
  const stories = useSelector(state => state.STORIES[storyCategory]);
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

      reDispatch(setDispatch[storyCategory](results));
      return dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    if (stories && stories.length === 0) fetchData();
  }, [stories]);

  return { ...state, stories };
};


export default useHNstories;
