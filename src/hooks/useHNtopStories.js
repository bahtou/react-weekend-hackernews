import { useEffect, useReducer } from 'react';
import hnEndpoint, {
  STORY,
  TOP_STORIES
} from 'Endpoints';


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

const useHNtopStories = limit => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    stories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await hnEndpoint(TOP_STORIES);
      const limitedStoryIds = storyIds.slice(0, limit);

      const promises = limitedStoryIds.map(async storyId => await hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);

      dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    fetchData();
  }, [limit]);

  return { ...state };
};


export default useHNtopStories;
