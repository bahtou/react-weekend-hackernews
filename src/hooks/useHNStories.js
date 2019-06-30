import { useEffect, useReducer } from 'react';
import hnEndpoint, {
  STORY,
  TOP_STORIES
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        stories: action.payload
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

const useHNStories = (endpoint, limit) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    stories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await hnEndpoint(endpoint);
      if (storyIds.error) {
        dispatch({ type: 'FETCH_FAILURE' })
        return
      }

      const limitedStoryIds = storyIds.slice(0, limit);

      const promises = limitedStoryIds.map(async storyId => await hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);
      if (results.some(result => result.error)) {
        dispatch({ type: 'FETCH_FAILURE' })
        return
      }


      dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    fetchData();
  }, [limit]);

  return { ...state };
};


export default useHNStories;
