import createReducer from './createReducer';


export const TOP_STORIES = 'TOP_STORIES';
export const BEST_STORIES = 'BEST_STORIES';
export const SET_TOP_STORIES = 'SET_TOP_STORIES';
export const SET_BEST_STORIES = 'SET_BEST_STORIES';

export const setBestStories = stories => {
  return {
    type: SET_BEST_STORIES,
    payload: stories
  };
};
export const setTopStories = stories => {
  return {
    type: SET_TOP_STORIES,
    payload: stories
  };
};


const initialState = {
  [TOP_STORIES]: [],
  [BEST_STORIES]: []
};

const actionHandlers = {
  [SET_TOP_STORIES](state, action) {
    return {
      ...state,
      [TOP_STORIES]: action.payload
    };
  },
  [SET_BEST_STORIES](state, action) {
    return {
      ...state,
      [BEST_STORIES]: action.payload
    };
  }
};


export default createReducer(initialState, actionHandlers);


// Selector
export const getStoryDomains = (state, storyType) => {
  return state[storyType]
}
